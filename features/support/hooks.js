'use strict';

const { chromium } = require('@playwright/test');
const { Before, After } = require('@cucumber/cucumber');

// When run through `browserstack-node-sdk cucumber-js`, the BrowserStack Node
// SDK patches the Playwright library at import time and routes the browser
// session to BrowserStack using the capabilities declared in browserstack.yml.
// No CDP wsEndpoint or credentials are needed in the test code.
Before(async function () {
  this.browser = await chromium.launch();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
  if (this.browser) {
    await this.browser.close();
  }
});
