import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { registerHooks } from "node:module";

// Resolve the same aliases as Next.js without a build or any external requests.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "next/server") return nextResolve("next/server.js", context);
    if (specifier.startsWith("@/")) return { url: new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, shortCircuit: true };
    return nextResolve(specifier, context);
  },
});
const envKeys = ["RESEND_API_KEY", "ANTHROPIC_API_KEY", "SLACK_WEBHOOK_URL", "LEADAGENT_WEBHOOK_KEY", "ALEXANDER_EMAIL"];
const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
const originalFetch = globalThis.fetch;
let version = 0;
let calls;
let reportFails;
let emailResponse;
const enquiry = (overrides = {}) => ({ company: "Example", name: "Test Person", email: "visitor@example.com", branche: "Service", stoerrelse: "1-10", tidsforbrug: ["Rapportering"], systemer: ["Microsoft 365"], bookCall: true, phone: "+45 12 34 56 78", ...overrides });
const request = body => new Request("https://ai-konsulenterne.dk/api/ai-analyse", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
const post = async body => {
  const { POST } = await import(`../src/app/api/ai-analyse/route.ts?test=${++version}`);
  return POST(request(body));
};

beforeEach(() => {
  for (const key of envKeys) delete process.env[key];
  process.env.RESEND_API_KEY = "mock-never-sent";
  process.env.ANTHROPIC_API_KEY = "mock-never-sent";
  process.env.ALEXANDER_EMAIL = "team@example.com";
  calls = [];
  reportFails = false;
  emailResponse = () => Response.json({ id: "mock-provider-receipt" });
  globalThis.fetch = async (url, options) => {
    const body = JSON.parse(options.body);
    calls.push({ url, body });
    if (url === "https://api.anthropic.com/v1/messages") {
      return reportFails ? Response.json({ error: "mock failure" }, { status: 500 }) : Response.json({ content: [{ text: "## Mock report\n- Example opportunity" }] });
    }
    if (url === "https://api.resend.com/emails") return emailResponse(body);
    throw new Error(`Unexpected external service in test: ${url}`);
  };
});
after(() => {
  globalThis.fetch = originalFetch;
  hooks.deregister();
  for (const key of envKeys) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

test("callback requests require a usable phone before contacting any provider", async () => {
  for (const phone of [undefined, "", "123", "call me", {}, "1".repeat(41)]) {
    assert.equal((await post(enquiry({ phone }))).status, 400);
  }
  assert.equal(calls.length, 0);
});
test("accepted callback includes the phone in the internal email and is not a calendar booking", async () => {
  const response = await post(enquiry());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, accepted: true, emailDelivered: true, bookCall: true });
  const internal = calls.find(call => call.body.to?.[0] === "team@example.com");
  assert.match(internal.body.html, /Telefon: \+45 12 34 56 78/);
  assert.match(internal.body.html, /Ønsker opkald: ja/);
  assert.doesNotMatch(internal.body.html, /Booket samtale: ja/);
});
test("ordinary report requests still work without a callback phone", async () => {
  const response = await post(enquiry({ bookCall: false, phone: undefined }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).emailDelivered, true);
});
test("failed or unacknowledged internal email never reports a successful request", async () => {
  for (const result of [() => Response.json({ error: "mock rejection" }, { status: 422 }), () => Response.json({}), () => { throw new Error("mock network failure"); }]) {
    emailResponse = body => body.to[0] === "team@example.com" ? result() : Response.json({ id: "mock-customer-receipt" });
    const response = await post(enquiry());
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, undefined);
  }
});
test("customer email failure is reported accurately while an accepted internal enquiry can be followed up", async () => {
  emailResponse = body => body.to[0] === "visitor@example.com" ? Response.json({}, { status: 422 }) : Response.json({ id: "mock-internal-receipt" });
  const response = await post(enquiry());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, accepted: true, emailDelivered: false, bookCall: true });
});
test("report-generation failure still emails the callback and returns truthful manual-follow-up status", async () => {
  reportFails = true;
  const response = await post(enquiry());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, accepted: true, fallback: true, emailDelivered: false, bookCall: true });
  const internal = calls.find(call => call.body.to?.[0] === "team@example.com");
  assert.match(internal.body.subject, /Følg op manuelt/);
  assert.match(internal.body.html, /Telefon: \+45 12 34 56 78/);
});
test("fallback cannot claim manual follow-up if internal email fails", async () => {
  reportFails = true;
  emailResponse = () => Response.json({}, { status: 422 });
  const response = await post(enquiry());
  assert.equal(response.status, 502);
  assert.equal((await response.json()).success, undefined);
  assert.equal(calls.filter(call => call.body.to?.[0] === "visitor@example.com").length, 0);
});
test("unconfigured email fails before generating a paid AI report", async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await post(enquiry())).status, 503);
  assert.equal(calls.length, 0);
});
