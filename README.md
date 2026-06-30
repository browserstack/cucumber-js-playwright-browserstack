# cucumber-js-playwright-browserstack

This sample shows how to run [Cucumber-JS](https://github.com/cucumber/cucumber-js) + [Playwright](https://playwright.dev/) tests on BrowserStack using the [BrowserStack Node SDK](https://www.npmjs.com/package/browserstack-node-sdk). The SDK reads `browserstack.yml`, fans your scenarios out across the platforms listed there, starts and stops BrowserStack Local automatically, and reports test status to the BrowserStack dashboard. Your test code stays plain `@playwright/test` + `@cucumber/cucumber` -- no manual `connect()`, no capabilities in code.

![BrowserStack Logo](https://d98b8t1nnulk5.cloudfront.net/production/images/layout/logo-header.png?1469004780)

## Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended) and npm
* A BrowserStack account -- grab your [Username and Access Key](https://www.browserstack.com/accounts/settings)

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

For apps on `localhost`, a staging host, or behind a firewall, set `browserstackLocal: true` in `browserstack.yml`, then run the `local` profile:

```sh
npm run sample-local-test
```

The SDK starts and stops the BrowserStack Local tunnel for you -- no manual binary download or lifecycle management. The scenario points at `http://bs-local.com:45454/`, a hostname BrowserStack Local resolves back to your machine.

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
