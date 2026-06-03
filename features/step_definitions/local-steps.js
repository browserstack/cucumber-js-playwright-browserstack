'use strict';

const assert = require('assert');
const { When, Then } = require('@cucumber/cucumber');

When(/^I open dashboard$/, async function () {
  await this.page.goto('http://bs-local.com:45454');
});

Then(/^I should see "([^"]*)"$/, async function (sourceMatch) {
  const title = await this.page.title();
  assert.strictEqual(
    title,
    sourceMatch,
    'Expected page title to be ' + sourceMatch
  );
});
