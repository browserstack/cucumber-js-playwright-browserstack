Feature: BStackLocalSample

  As a developer testing a private host
  I want BrowserStack Local to tunnel my localhost to BrowserStack
  So that the cloud browser can reach a page only my machine can serve

  Scenario: Reach a private host via BrowserStack Local
    Given I open the local sample page on bs-local
    Then the local sample page title contains "BrowserStack Local"
