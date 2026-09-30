import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const compiled = ts.transpileModule(
  readFileSync(new URL("../src/lib/analytics.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

function setup(consent) {
  const google = [];
  const pixel = [];
  const scripts = [];
  const listeners = new Map();
  const window = {
    gtag: (...args) => google.push(args),
    ...(consent ? { Cookiebot: { consent } } : {}),
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
  };
  const exports = {};
  runInNewContext(compiled, {
    exports,
    window,
    document: {
      createElement: () => ({ dataset: {} }),
      head: { appendChild: (script) => scripts.push(script) },
    },
  });
  return {
    api: exports,
    window,
    google,
    pixel,
    scripts,
    event(name = "CookiebotOnConsentReady") {
      for (const callback of listeners.get(name) || []) callback();
    },
    loadPixel() {
      // Stand-in for the downloaded SDK; never makes a network request.
      const script = scripts.find((item) => item.id === "openai-measurement-pixel");
      assert.ok(script);
      pixel.push(...(window.oaiq.q || []));
      window.oaiq = (...args) => pixel.push(args);
      script.onload();
    },
  };
}

const explicit = (statistics, marketing) => ({ method: "explicit", statistics, marketing });
const events = (calls) => JSON.parse(JSON.stringify(calls.filter((call) => call[0] === "event")));
const measurements = (calls) => JSON.parse(JSON.stringify(calls.filter((call) => call[0] === "measure")));

test("no scripts or events without explicit consent, including missing Cookiebot", () => {
  for (const consent of [undefined, explicit(false, false), { method: "implied", statistics: true, marketing: true }]) {
    const state = setup(consent);
    state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
    state.api.trackEvent("newsletter_signup");
    state.api.trackLeadConversion("contact");
    assert.equal(state.scripts.length, 0);
    assert.deepEqual(events(state.google), []);
    assert.equal(state.window.oaiq, undefined);
  }
});

test("statistics consent permits GA but not advertising measurement", () => {
  const state = setup(explicit(true, false));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
  state.api.trackLeadConversion("contact");
  assert.deepEqual(state.scripts.map((script) => script.id), ["ga4-loader"]);
  assert.deepEqual(events(state.google), [["event", "generate_lead", { form: "contact" }]]);
  assert.equal(state.window.oaiq, undefined);
});

test("marketing consent permits a confirmed lead after Pixel load, without form data", () => {
  const state = setup(explicit(false, true));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
  assert.deepEqual(state.scripts.map((script) => script.id), ["openai-measurement-pixel"]);
  state.api.trackLeadConversion("contact");
  state.loadPixel();
  assert.deepEqual(measurements(state.pixel), [], "early submissions are not queued");
  state.api.trackLeadConversion("contact");
  assert.deepEqual(measurements(state.pixel), [["measure", "lead_created", { type: "customer_action" }]]);
  assert.deepEqual(events(state.google), []);
});

test("consent changes do not replay denied submissions or load duplicate scripts", () => {
  const state = setup(explicit(false, false));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
  state.api.trackLeadConversion("contact");
  state.window.Cookiebot.consent = explicit(true, true);
  state.event();
  state.loadPixel();
  state.event("CookiebotOnAccept");
  assert.equal(state.scripts.length, 2);
  assert.deepEqual(events(state.google), []);
  assert.deepEqual(measurements(state.pixel), []);

  state.api.trackLeadConversion("contact");
  state.window.Cookiebot.consent = explicit(false, false);
  state.event("CookiebotOnDecline");
  state.api.trackLeadConversion("contact");
  assert.equal(state.window["ga-disable-G-TEST"], true);
  assert.deepEqual(state.pixel.at(-1), ["consent", false]);
  assert.equal(events(state.google).length, 1);
  assert.equal(measurements(state.pixel).length, 1);
});

test("consent revoked while the Pixel loads remains denied on completion", () => {
  const state = setup(explicit(false, true));
  state.api.startAnalytics({ openaiPixelId: "test-pixel" });
  state.window.Cookiebot.consent = explicit(false, false);
  state.event();
  state.loadPixel();
  state.api.trackLeadConversion("contact");
  assert.deepEqual(state.pixel.at(-1), ["consent", false]);
  assert.deepEqual(measurements(state.pixel), []);
});

test("blank Pixel ID keeps advertising measurement unloaded", () => {
  const state = setup(explicit(true, true));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "" });
  state.api.trackLeadConversion("contact");
  assert.deepEqual(state.scripts.map((script) => script.id), ["ga4-loader"]);
  assert.equal(state.window.oaiq, undefined);
});

test("phone and email clicks remain intent events, not lead conversions", () => {
  const state = setup(explicit(true, true));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
  state.loadPixel();
  state.api.trackContactIntent("phone");
  state.api.trackContactIntent("email");
  assert.deepEqual(events(state.google), [["event", "phone_click", {}], ["event", "email_click", {}]]);
  assert.deepEqual(measurements(state.pixel), []);
});

test("tracker failures cannot turn a successful submission into a form error", () => {
  const state = setup(explicit(true, true));
  state.api.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" });
  state.loadPixel();
  state.window.gtag = () => { throw new Error("blocked tracker"); };
  state.window.oaiq = () => { throw new Error("blocked tracker"); };
  assert.doesNotThrow(() => state.api.trackLeadConversion("contact"));
});

test("event helpers and startup are safe during server rendering", () => {
  const exports = {};
  runInNewContext(compiled, { exports });
  assert.doesNotThrow(() => {
    exports.startAnalytics({ gaId: "G-TEST", openaiPixelId: "test-pixel" })();
    exports.trackLeadConversion("contact");
    exports.trackContactIntent("phone");
  });
});
