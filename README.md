# Running Playwright Tests with Cucumber.js on BrowserStack

Cucumber.js is a JavaScript-based open-source framework for web automation testing. It runs on Node.js and latest web browsers. Cucumber.js allows you to write and execute tests in Gherkin - a non-technical and human-readable language.

By default, Cucumber JS will automatically search for Step Definitions in the same folder as the feature files.

This repository provides an example setup for running Playwright tests with Cucumber.js on the BrowserStack cloud platform.

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org) - The JavaScript runtime environment
- [npm](https://www.npmjs.com/) - The Node.js package manager
- [Playwright](https://playwright.dev/) - A Node.js library for browser automation

## Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/browserstack/cucumber-js-playwright-browserstack.git
```

2. Install the dependencies by navigating to the project directory and running:


```bash
npm install
```

3. Set up your BrowserStack Environment variables

```plaintext
BROWSERSTACK_USERNAME=<your-browserstack-username>
BROWSERSTACK_ACCESS_KEY=<your-browserstack-access-key>
```

Replace `<your-browserstack-username>` and `<your-browserstack-access-key>` with your BrowserStack username and access key, which you can obtain from the BrowserStack dashboard.

## Browserstack Configuration 
To view and update the Browser-OS combinations, please refer to the "features/steps/setup.js" file.

## Execution
To run the tests in parallel with different browser configurations, use the following command:

## Running your Tests:
To run a sample Test, run 

```bash
npm run sample-test
```
This command will execute the Cucumber.js tests in parallel on Chrome and Edge browsers based on the configurations specified in the "features/steps/setup.js" file.`

## Run Test on Locally hosted Websites

```bash
npm sample-local-test
```

## Reporting

By default, Cucumber.js generates HTML reports in the `reports` directory after the test execution. You can open the HTML report in your browser to view the test results and detailed information.

## Conclusion

This repository provides a basic setup for running Playwright tests with Cucumber.js on the BrowserStack cloud platform. Feel free to modify and expand it based on your project requirements.

For more information on Playwright and Cucumber.js, refer to their respective documentation:

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)

For additional details on configuring and using BrowserStack with Playwright, consult the BrowserStack documentation:

- [BrowserStack Documentation](https://www.browserstack.com/docs)

Happy testing!