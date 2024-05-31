Feature: Test DBYar Application Navigation

  @Test
  Scenario: Validate successful navigation flow from homepage to hub registration
    Given the user is on the DBYaR homepage
    When the user logs in "austin@dbyarforum.org"
    And the user registers to the hub with "Chennai-Hub-6"
    Then the user logs out
