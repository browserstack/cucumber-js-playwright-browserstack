const { setWorldConstructor, World, Before, After, Status, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, devices } = require('playwright');
const cp = require('child_process');
const BrowserStackLocal = require('browserstack-local');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
setDefaultTimeout(120 * 1000);

const enableLocalTesting = true; // Set this flag to true to enable BrowserStack Local testing

const browserConfigs = [
  {
    browserName: 'chrome',
    browserVersion: 'latest',
    os: 'Windows',
    osVersion: '10',
    resolution: '1280x1024',
  },
  {
    browserName: 'chrome',
    browserVersion: 'latest',
    os: 'Windows',
    osVersion: '11',
    resolution: '1280x1024',
  },
];

const browserConnections = [];

Before(async (scenario) => {
  const browserConfig = browserConfigs[scenario.pickle.tags.indexOf('@browser')];

  const caps = {
    ...browserConfig,
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    'project': 'PLAYWRIGHT-CUCUMBER-JS',
    'build': 'playwright-cucumber-build-1',
    'name': scenario.pickle.name,
    'buildTag': 'Regression',
    'browserstack.playwrightVersion': '1.latest',
    'client.playwrightVersion': '1.latest'
  };

  if (enableLocalTesting && browserConnections.length === 0) {
    const bsLocal = new BrowserStackLocal.Local();
    const bsLocalArgs = {
      key: process.env.BROWSERSTACK_ACCESS_KEY, // Replace with your BrowserStack access key
      localIdentifier: 'local_connection_name' // Replace with your desired local connection name
    };

    await new Promise((resolve, reject) => {
      bsLocal.start(bsLocalArgs, (error) => {
        if (error) {
          console.error('Failed to start BrowserStack Local:', error);
          reject(error);
        } else {
          console.log('BrowserStack Local started successfully');
          resolve();
        }
      });
    });
  }

  // Create page and browser globals to be used in the scenarios
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
  });

  const context = await browser.newContext();
  global.page = await context.newPage();

  browserConnections.push(browser);
});

After(async () => {
  await Promise.all(browserConnections.map(browser => browser.close()));
});

After(async (scenario) => {
  if (scenario.result.status === Status.PASSED) {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Test Passed' } })}`);
  } else if (scenario.result.status === Status.FAILED) {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Test Failed' } })}`);
  }
});

setWorldConstructor(function () {
  this.testCaseRetry = 2; // Set the number of retries for each test case
});

module.exports = {
  parallel: 2, // Set the number of parallel test workers to the number of browsers
};