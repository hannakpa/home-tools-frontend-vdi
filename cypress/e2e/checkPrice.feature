Feature: Check product's price
  As a user, I want to be able to check the price of the product that is added to the list.

Rule: When the price is consulted, the user gets the price.
  Scenario Outline: The consulted price is available
    Given the user is in the 'Einkaufsliste ändern' page of the list "Test111"
    And the product "<ProductName>" exists
    When the user checks the "price" of "<ProductName>"
    Then the price "<ProductPrice>" appears in the right side of the icon
    Examples:
      | ProductName | ProductPrice |
      | Apple       | 0.34         |
      | Caviar      | 5000         |

  Scenario: The consulted price is not available
    Given the user is in the 'Einkaufsliste ändern' page of the list "Test111"
    And the product "Bread" exists
    When the user checks the "price" of "Bread"
    Then the message "Price not found" should appear

