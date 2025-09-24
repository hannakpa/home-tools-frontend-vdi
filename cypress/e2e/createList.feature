Feature: Create a shopping list
  As a user, I want to be able to create a new list in order to access it later.

Rule: When all the fields are filled, the list can be saved and accessed
  Scenario Outline: : Name field is complete
    Given the user is in the 'Einkaufsliste anlegen' page
    And 'Fälligkeits Datum' is filled in
    And the user writes the name "<TestName>"
    And the user selects a Zugewiesene Nutzer "<NutzerName>"
    When the user saves the list
    Then is listed in the 'Einkaufsliste ändern' page with the name "<TestName>"
    And the list "<TestName>" can be accessed
    Examples:
      | TestName | NutzerName      |
      | Test1111 | #Andre_checkbox |
