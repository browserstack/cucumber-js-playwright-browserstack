const locators = {
  "sign_in": "#signin",
  "username_field": "#username",
  "username_input": "//input[@id='react-select-2-input']",
  "password_field": "#password",
  "password_input": "//input[@id='react-select-3-input']",
  "login_button": "#login-btn",
  "username_text": "//span[text()='fav_user']"
}

class LoginPage {

  async navigateToAutomate() {
    return await page.goto(global.BASE_URL);
  }

  async verifyHomePageIsDisplayed() {
    return expect(await page.title()).to.equal('StackDemo');
  }

  async clickSignIn() {
    const element = await page.waitForSelector(locators.sign_in);
    await page.click(locators.sign_in);
  }

  async submitLoginForm(username, password) {    
    const element = await page.waitForSelector(locators.username_field);
    // Click Username field
    await page.click(locators.username_field);
    // Enter Username
    await page.fill(locators.username_input, username);
    await page.keyboard.press('Enter');
    // Click Password field
    await page.click(locators.password_field);
    await page.fill(locators.password_input, password);
    await page.keyboard.press('Enter');
    // Click Login Button
    await page.click(locators.login_button);
  }
}

module.exports = { LoginPage };