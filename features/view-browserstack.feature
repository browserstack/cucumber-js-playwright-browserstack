Feature: View BrowserStack Demo Site

  @chrome
  Scenario: Verify if User is able to place the Order
    Given Open BrowserStack Demo website
    And I SignIn as "fav_user" with "testingisfun99" password
    When I add iPhone 12 to cart
    And I add the shipping address and submit the details
      | FirstName | LastName | Address  | State     | PostalCode |
      | Demo      | User     | H.no 123 | Telangana | 500019     |
    Then I should see product has been placed successfully

  @edge
  Scenario: Verify if User is able to place the Order on Edge
    Given Open BrowserStack Demo website
    And I SignIn as "fav_user" with "testingisfun99" password
    When I add iPhone 12 to cart
    And I add the shipping address and submit the details
      | FirstName | LastName | Address  | State     | PostalCode |
      | Demo      | User     | H.no 123 | Telangana | 500019     |
    Then I should see product has been placed successfully