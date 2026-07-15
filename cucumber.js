// Cucumber-JS profiles. The BrowserStack SDK (invoked via `browserstack-node-sdk
// cucumber-js`) reads browserstack.yml, fans each profile out across the platforms
// declared there, and routes the Playwright `chromium.launch()` in support/hooks.js
// to BrowserStack.
//
//   npm run sample-test       -> --profile sample (public bstackdemo)
//   npm run sample-local-test -> --profile local  (BrowserStack Local)
const common = ['features/support/hooks.js'];

module.exports = {
  sample: {
    paths: ['features/sample.feature'],
    require: ['features/step_definitions/sample_steps.js', ...common],
  },
  local: {
    paths: ['features/local.feature'],
    require: ['features/step_definitions/local_steps.js', ...common],
  },
};
