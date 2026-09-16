import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.js';

const valid = { name: 'Тестовая заявка', email: 'test@example.com', phone: '+7 (999) 123-45-67', organization: '', message: 'Тестовое обращение в Федерацию', type: 'contact', consent: true, consentVersion: '2026-09-11', website: '' };
async function withApi(sendEmail, run) {
 const server = createApp({ sendEmail }).listen(0, '127.0.0.1');
 await new Promise(resolve => server.once('listening', resolve));
 const post = (data) => fetch(`http://127.0.0.1:${server.address().port}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
 try { await run(post); } finally { await new Promise(resolve => server.close(resolve)); }
}
test('all form types deliver validated data and consent version', async () => {
 const sent = [];
 await withApi(async data => sent.push(data), async post => {
  for (const type of ['contact', 'join', 'partner']) {
   const response = await post({ ...valid, type, name: '  Тестовая заявка  ' });
   assert.equal(response.status, 200); assert.deepEqual(await response.json(), { success: true });
  }
 });
 assert.equal(sent.length, 3); assert.equal(sent[0].name, valid.name); assert.equal(sent[0].consentVersion, '2026-09-11');
});
test('missing consent, wrong version, invalid phone and whitespace are rejected', async () => {
 let sent = 0;
 await withApi(async () => sent++, async post => {
  for (const patch of [{ consent: false }, { consentVersion: undefined }, { phone: 'abc123' }, { message: '             ' }]) assert.equal((await post({ ...valid, ...patch })).status, 400);
 });
 assert.equal(sent, 0);
});
test('honeypot does not send mail; empty optional phone is accepted', async () => {
 let sent = 0;
 await withApi(async () => sent++, async post => {
  assert.equal((await post({ ...valid, website: 'bot' })).status, 200);
  assert.equal(sent, 0);
  assert.equal((await post({ ...valid, phone: '' })).status, 200);
 });
 assert.equal(sent, 1);
});
test('delivery failure returns an error instead of success', async () => {
 await withApi(async () => { throw new Error('Simulated delivery failure'); }, async post => {
  const response = await post(valid); assert.equal(response.status, 500); assert.ok((await response.json()).error);
 });
});
test('rate limiting rejects the sixth attempt', async () => {
 await withApi(async () => {}, async post => {
  for (let i = 0; i < 5; i++) assert.equal((await post(valid)).status, 200);
  assert.equal((await post(valid)).status, 429);
 });
});
