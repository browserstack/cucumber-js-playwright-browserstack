'use strict';

const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

let productText = '';

Given(/^I visit bstackdemo website/, async function () {
  await this.page.goto('https://bstackdemo.com/');
});

When(/^I add a product to the cart/, async function () {
  await this.page.waitForSelector('//*[@id="1"]/p');
  productText = await this.page.locator('//*[@id="1"]/p').innerText();
  await this.page.locator('//*[@id="1"]/div[4]').click();
});

Then(/^I should see the same product in the cart section/, async function () {
  await this.page.waitForSelector('.float-cart__content');

  await this.page.waitForSelector(
    '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
  );
  const productCartText = await this.page
    .locator('//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]')
    .innerText();

  assert.strictEqual(
    productCartText,
    productText,
    'Expected product to be ' + productText
  );
});
