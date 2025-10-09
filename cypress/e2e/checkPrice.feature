Feature: Check product's price
  As a user, I want to be able to check the price of the product that is added to the list.

Rule: When the price is consulted, the user gets the price.
  Scenario: The price is consulted
    Given the user is in the 'Einkaufsliste ändern' page of the list "Test111"
    And the product "Apple" exists
    When the user clicks on the price icon
    Then the message "The price of Apple is 1.99€" will be shown in an alert message
