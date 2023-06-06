const { Given, When, Then } = require("@cucumber/cucumber");
const { HomePage } = require('../../page-objects/home-page')
const { LoginPage } = require('../../page-objects/login-page')
const { CheckoutPage } = require('../../page-objects/checkout-page')
const homePage = new HomePage();
const loginPage = new LoginPage();
const checkoutPage = new CheckoutPage();

Given("Open BrowserStack Demo website", { timeout: 60 * 1000 }, async function () {
  await homePage.navigateToAutomate();
  await homePage.verifyHomePageIsDisplayed();
});

Given('I SignIn as {string} with {string} password', async function (username, password) {
  await homePage.clickSignIn();
  await loginPage.submitLoginForm(username, password);
  await homePage.verifyAfterLoginPage();
});

When("I add iPhone 12 to cart", async function () {
  await homePage.clickProduct();
  // Click Checkout
  await page.click("text=Checkout");
});

When("I add the shipping address and submit the details", async function (dataTable) {
  const userPromises = dataTable.hashes().map(async (element) => {
    await checkoutPage.setUserDetails(element.FirstName, element.LastName, element.Address, element.State, element.PostalCode);
  });

  await Promise.all(userPromises);
});

Then("I should see product has been placed successfully", async function () {
  await checkoutPage.clickSubmit();
  await wait(3000);
  await checkoutPage.verifyConfirmationMessage();
});

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}