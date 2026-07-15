const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// With `browserstackLocal: true` in browserstack.yml the SDK opens a tunnel, so the
// cloud browser can reach http://bs-local.com:<port>/ -- a host only your machine serves.
Given('I open the local sample page on bs-local', async function () {
  await this.page.goto('http://bs-local.com:45454/');
});

Then('the local sample page title contains {string}', async function (expected) {
  const title = await this.page.title();
  assert.ok(title.includes(expected), `expected title to contain "${expected}" but was "${title}"`);
});
