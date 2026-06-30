const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let productTitle;

Given('I open the bstackdemo home page', async function () {
  await this.page.goto('https://bstackdemo.com/');
});

When('I add the first product to the cart', async function () {
  const firstProduct = this.page.locator('[id="1"]');
  productTitle = await firstProduct.locator('.shelf-item__title').first().innerText();
  await firstProduct.getByText('Add to Cart').click();
});

Then('the cart shows 1 item that matches the product I added', async function () {
  const quantity = await this.page.locator('.bag__quantity').innerText();
  assert.strictEqual(quantity, '1');

  const cartTitle = await this.page.locator('.shelf-item__details .title').innerText();
  assert.strictEqual(cartTitle, productTitle);
});
