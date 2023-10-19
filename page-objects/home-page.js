const locators = {
  "sign_in": "#signin",
  "username_input": "#user-name",
  "password_input": "#password",
  "login_button": "#login-button",
  "username_text": "//span[text()='fav_user']",
}

class HomePage {

  async navigateToAutomate() {
    return await page.goto(global.BASE_URL);
  }

  async navigateToLocalWebsite() {
    return await page.goto(global.LOCAL_URL);
  }

  async verifyHomePageIsDisplayed() {
    return expect(await page.title()).to.equal('StackDemo');
  }

  async clickSignIn() {
    const signInLocator = locators.sign_in;
    const element = await page.waitForSelector(signInLocator);
    await page.click(signInLocator);
  }

  async clickProduct() {
    await page.locator("(//div[text()='Add to cart'])[1]").click();
  }

  async verifyAfterLoginPage() {
    await page.waitForSelector(locators.username_text);
    const visible = await page.isVisible(locators.username_text);
    return expect(visible).to.equal(true);
  }
}

module.exports = { HomePage };