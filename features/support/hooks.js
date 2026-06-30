const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Cucumber steps can take longer than the default 5s on a remote browser.
setDefaultTimeout(60 * 1000);

let browser;

// Your code calls `chromium.launch()` as usual -- the BrowserStack SDK transparently
// routes the launch to the per-platform browser configured in browserstack.yml.
BeforeAll(async () => {
  browser = await chromium.launch();
});

AfterAll(async () => {
  if (browser) await browser.close();
});

// A fresh context + page per scenario; `this` is the Cucumber World shared with steps.
Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});
