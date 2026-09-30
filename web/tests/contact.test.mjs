import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { randomUUID } from "node:crypto";
import { POST } from "../src/app/api/contact/route.ts";

const originalFetch = globalThis.fetch;
const originalKey = process.env.RESEND_API_KEY;
let calls;
let provider;
let ip = 0;
const enquiry = (overrides = {}) => ({ name: "Test Person", email: "visitor@example.com", company: "Example", phone: "12345678", message: "A test enquiry", website: "", requestId: randomUUID(), ...overrides });
const request = (body, headers = {}) => new Request("https://ai-konsulenterne.dk/api/contact", {
  method: "POST", headers: { "content-type": "application/json", origin: "https://ai-konsulenterne.dk", "cf-connecting-ip": `test-${++ip}`, ...headers }, body: JSON.stringify(body),
});
beforeEach(() => {
  process.env.RESEND_API_KEY = "test-key-never-sent";
  calls = [];
  provider = () => Response.json({ id: "mock-email-id" });
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return provider(); };
});
after(() => {
  globalThis.fetch = originalFetch;
  if (originalKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalKey;
});

test("accepts an enquiry only after provider acknowledgement, without subscribing the visitor", async () => {
  const body = enquiry();
  const response = await POST(request(body));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true, accepted: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  const email = JSON.parse(calls[0].options.body);
  assert.equal(email.reply_to, body.email);
  assert.equal(email.to.length, 1);
  assert.notEqual(email.to[0], body.email);
  assert.match(email.text, /ikke en bekræftet mødebooking/);
  assert.equal(calls[0].options.headers["Idempotency-Key"], `website-contact/${body.requestId}`);
});
test("reuses the same idempotency key for a retried submission", async () => {
  const body = enquiry();
  await POST(request(body)); await POST(request(body));
  assert.equal(calls[0].options.headers["Idempotency-Key"], calls[1].options.headers["Idempotency-Key"]);
});
test("fails closed when delivery is unconfigured", async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request(enquiry()))).status, 503);
  assert.equal(calls.length, 0);
});
test("does not report success on provider rejection, timeout or missing receipt", async () => {
  for (const result of [() => Response.json({ error: "no" }, { status: 422 }), () => Response.json({}), () => { throw new Error("network"); }]) {
    provider = result;
    const response = await POST(request(enquiry()));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, undefined);
  }
});
test("rejects malformed and missing contact fields before calling a provider", async () => {
  for (const fields of [{ name: " " }, { email: "invalid" }, { email: 123 }, { name: {} }, { message: "x".repeat(2001) }, { requestId: "bad-id" }, { website: "spam.example" }]) {
    assert.equal((await POST(request(enquiry(fields)))).status, 400);
  }
  assert.equal(calls.length, 0);
});
test("rejects cross-origin and non-JSON requests", async () => {
  assert.equal((await POST(request(enquiry(), { origin: "https://other.example" }))).status, 403);
  assert.equal((await POST(request(enquiry(), { "content-type": "text/plain" }))).status, 415);
  assert.equal(calls.length, 0);
});
test("accepts the browser host when Next.js uses an internal request URL", async () => {
  const proxied = new Request("http://localhost:3004/api/contact", {
    method: "POST", headers: { "content-type": "application/json", origin: "http://127.0.0.1:3004", host: "127.0.0.1:3004" }, body: JSON.stringify(enquiry()),
  });
  assert.equal((await POST(proxied)).status, 200);
});
test("rejects oversized bodies even without Content-Length", async () => {
  assert.equal((await POST(request(enquiry({ message: "x".repeat(20_000) })))).status, 413);
  assert.equal(calls.length, 0);
});
test("limits repeated submissions from one address", async () => {
  for (let index = 0; index < 5; index++) assert.equal((await POST(request(enquiry(), { "cf-connecting-ip": "rate-limit-test" }))).status, 200);
  const blocked = await POST(request(enquiry(), { "cf-connecting-ip": "rate-limit-test" }));
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("Retry-After"), "600");
  assert.equal(calls.length, 5);
});
