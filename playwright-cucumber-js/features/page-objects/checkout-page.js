locators = {
  "submit_button": "#checkout-shipping-continue",
  "confirmation_message": "#confirmation-message"
}

class CheckoutPage {

  async setUserDetails(firstName, lastName, address, state, pincode) {
    await page.locator("//input[@id='firstNameInput']").fill(firstName);
    await page.locator("//input[@id='lastNameInput']").fill(lastName);
    await page.locator("//input[@id='addressLine1Input']").fill(address);
    await page.locator("//input[@id='provinceInput']").fill(state);
    await page.locator("//input[@id='postCodeInput']").fill(pincode);

  }

  async verifyHomePageIsDisplayed() {
    return expect(await page.title()).to.equal('StackDemo');
  }

  async clickSubmit() {
    await page.locator("//button[@id='checkout-shipping-continue']").dblclick();

  }

  async clickProduct() {
    await page.locator("(//div[text()='Add to cart'])[1]").click();
  }

  async verifyAfterLoginPage() {
    await page.waitForSelector(locators.username_text);
    const visible = await page.isVisible(locators.username_text);
    return expect(visible).to.equal(true);
  }

  async verifyConfirmationMessage() {
    const visible = await page.locator("//legend[@id='confirmation-message']").isVisible();
    return expect(visible).to.equal(true);
  }
}

module.exports = { CheckoutPage };