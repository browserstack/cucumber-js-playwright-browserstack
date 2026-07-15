Feature: BStackDemo cart

  As a shopper on bstackdemo.com
  I want to add an item to my cart
  So that I can verify the cart shows what I picked

  Scenario: Add the first item to cart
    Given I open the bstackdemo home page
    When I add the first product to the cart
    Then the cart shows 1 item that matches the product I added
