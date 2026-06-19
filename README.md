# Cucumber-JS (Playwright) with BrowserStack

Run your Cucumber-JS + Playwright tests on the BrowserStack cloud using the [BrowserStack Node SDK](https://www.browserstack.com/docs/automate/selenium/sdk-overview). This sample tests on BrowserStack Automate.

## Prerequisites

- A [BrowserStack](https://www.browserstack.com/) account (username + access key).
- [Node.js](https://nodejs.org/) (>= 14) and npm installed.
- Your BrowserStack credentials, available from your [account settings](https://www.browserstack.com/accounts/settings).

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/browserstack/cucumber-js-playwright-browserstack.git
   cd cucumber-js-playwright-browserstack
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set your BrowserStack credentials as environment variables:

   ```bash
   export BROWSERSTACK_USERNAME="YOUR_USERNAME"
   export BROWSERSTACK_ACCESS_KEY="YOUR_ACCESS_KEY"
   ```

   Alternatively, edit `browserstack.yml` and replace `YOUR_USERNAME` and `YOUR_ACCESS_KEY` with your credentials.

## Run Sample Test

Runs the sample test against the public BrowserStack demo website:

```bash
npx browserstack-node-sdk cucumber-js features/single.feature
```

## Run Local Test

Runs the local test through the BrowserStack Local tunnel (`browserstackLocal: true` in `browserstack.yml`):

```bash
npx browserstack-node-sdk cucumber-js features/local.feature
```

## Notes

- View your test runs and debug results on the [BrowserStack Automate dashboard](https://automate.browserstack.com/).
- Platforms, parallelism, and product capabilities (such as `testObservability`) are configured in `browserstack.yml`.
- The BrowserStack Node SDK patches the Playwright library at runtime and routes browser sessions to BrowserStack — no changes to your test code are required.
