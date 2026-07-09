# cucumber-js-playwright-browserstack

This sample shows how to run [Cucumber-JS](https://github.com/cucumber/cucumber-js) + [Playwright](https://playwright.dev/) tests on BrowserStack using the [BrowserStack Node SDK](https://www.npmjs.com/package/browserstack-node-sdk). The SDK reads `browserstack.yml`, fans your scenarios out across the platforms listed there, starts and stops BrowserStack Local automatically, and reports test status to the BrowserStack dashboard. Your test code stays plain `@playwright/test` + `@cucumber/cucumber` -- no manual `connect()`, no capabilities in code.

![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)

## Prerequisites

* [Node.js](https://nodejs.org/) 18, 20, or 22 LTS, and npm (verified on Node 20)
* A BrowserStack account -- grab your [Username and Access Key](https://www.browserstack.com/accounts/settings)

> **Note on the Cucumber version:** this sample pins `@cucumber/cucumber` to **v11**, which supports Node 18/20/22. Cucumber **v12** (`latest`) requires **Node 22+** (it uses `fs/promises.glob`) and will fail on Node 18/20 with `promises_1.glob is not a function`. Bump to v12 only if you are on Node 22+.

## Setup

* Clone the repo
* Install dependencies:

  ```sh
  npm install
  ```

* Add your credentials to `browserstack.yml` (replace `YOUR_USERNAME` / `YOUR_ACCESS_KEY`), or remove those two lines and export them as environment variables instead:

  ```sh
  export BROWSERSTACK_USERNAME=<browserstack-username>
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

## Run Sample Test

Runs the public [bstackdemo.com](https://bstackdemo.com/) add-to-cart scenario (the `sample` Cucumber profile) across every platform in `browserstack.yml`:

```sh
npm run sample-test
```

## Run Local Test (BrowserStack Local)

Use this when the site under test is on `localhost`, a staging host, or behind a firewall. BrowserStack Local opens a secure tunnel and resolves `bs-local.com` back to **your** machine, so the cloud browser can reach a page only you can serve.

The bundled `local` scenario navigates to `http://bs-local.com:45454/` and asserts the page title contains `BrowserStack Local` — so you must have something serving that page on port `45454` first:

1. Serve a matching page locally (any page whose `<title>` contains "BrowserStack Local" satisfies the scenario):

   ```sh
   mkdir -p bs-local-site && printf '<!doctype html><title>BrowserStack Local</title><body>OK</body>' > bs-local-site/index.html
   (cd bs-local-site && python3 -m http.server 45454) &
   ```

   To test **your own** app instead, serve it on port `45454` (or change the port and the title assertion in `features/step_definitions/local_steps.js`).

2. Set `browserstackLocal: true` in `browserstack.yml`.

3. Run the `local` profile:

   ```sh
   npm run sample-local-test
   ```

The SDK starts and stops the BrowserStack Local tunnel for you -- no manual binary download or lifecycle management. The tunnel routes `bs-local.com:45454` to your machine's `localhost:45454`.

## How the SDK changes things

- **One `browserstack.yml`** declares platforms, parallelism, the Local toggle, and reporting; the SDK picks them up automatically.
- **The SDK runs platforms in parallel for you** -- one Cucumber run per `(platform x parallelsPerPlatform)` cell, no per-platform branching needed.
- **The SDK rewrites Playwright launches** -- `features/support/hooks.js` calls `chromium.launch()` and the SDK transparently redirects it to the per-platform browser configured in the yml (`chrome` / `playwright-webkit` / `playwright-firefox`). No `chromium.connect(wss_url)` plumbing.
- **The SDK starts and stops BrowserStack Local** when `browserstackLocal: true`.

## Repo layout

```
.
├── browserstack.yml            # SDK config: credentials, platforms, Local toggle, reporting
├── package.json                # SDK run scripts + deps
├── cucumber.js                 # Cucumber profiles: `sample` (bstackdemo) and `local` (bs-local)
└── features/
    ├── sample.feature              # bstackdemo add-to-cart scenario
    ├── local.feature               # BrowserStack Local scenario
    ├── step_definitions/
    │   ├── sample_steps.js
    │   └── local_steps.js
    └── support/
        └── hooks.js                # launches Playwright per scenario; SDK routes the launch
```

## Notes

* View your test results on the [BrowserStack Automate dashboard](https://www.browserstack.com/automate).
* To test on a different set of browsers, see our [list of supported browsers and platforms](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate).
* Understand how many parallel sessions you need with the [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github).

## Further Reading

- [Cucumber-JS](https://github.com/cucumber/cucumber-js)
- [Playwright](https://playwright.dev/)
- [BrowserStack documentation for Playwright](https://www.browserstack.com/docs/automate/playwright)
- [BrowserStack Node SDK](https://www.npmjs.com/package/browserstack-node-sdk)

Happy Testing!
