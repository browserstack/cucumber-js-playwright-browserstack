const { setWorldConstructor, World, Before, After, Status,  setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, devices } = require('playwright')
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];
setDefaultTimeout(120 * 1000)

Before(async (scenario) => {

  const caps = {
    'os': 'os x',
    'os_version': 'big sur',
    'browser': 'chrome',  // You can choose `chrome`, `edge` or `firefox` in this capability
    'browser_version': 'latest',  // We support v83 and above. You can choose `latest`, `latest-beta`, `latest-1`, `latest-2` and so on, in this capability
    // 'browser': 'playwright-webkit',  // allowed browsers are `chrome`, `edge`, `playwright-chromium`, `playwright-firefox` and `playwright-webkit`
    // 'name': 'Test on Playwright emulated iPhone 11 Pro',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'YOUR_USERNAME',
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',   
    'project': 'PLAYWRIGHT-CUCUMBER-JS',
    'build': 'playwright-cucumber-build-1',
    'name': scenario.pickle.name,  // The name of your test and build. See browserstack.com/docs/automate/playwright/organize tests for more details
    'buildTag': 'Regression',
    // 'resolution': '1280x1024',
    // 'browserstack.local': 'true',
    // 'browserstack.localIdentifier': 'local_connection_name',
    // 'browserstack.playwrightVersion': '1.latest',
    // 'client.playwrightVersion': '1.latest'   
  };


  // Create page and browser globals to be used in the scenarios
  global.browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
  })

  //const context = await global.browser.newContext({...devices['iPhone 11 Pro']});
  const context = await global.browser.newContext();
  global.page = await context.newPage();
})

After(async () => {
  await global.browser.close()
})

After(async (scenario) => {
  if (scenario.result.status === Status.PASSED) {
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'passed', reason: 'Test Passed' } })}`);
  }
  else if (scenario.result.status === Status.FAILED) {  
    await page.evaluate(_ => { }, `browserstack_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { status: 'failed', reason: 'Test Failed' } })}`);
  }
});
