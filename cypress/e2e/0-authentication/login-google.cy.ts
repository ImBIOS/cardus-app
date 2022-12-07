describe("Google Login", () => {
  before(() => {
    // Logout before test started
    cy.visit("http://localhost:3000/api/auth/signout");
  });

  it("shows loading", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Loading").should("be.visible");
  });

  it("shows onboarding", function () {
    cy.contains("Easy Manage").should("be.visible");
    cy.contains("Next").click();

    cy.contains("Find Your Item").should("be.visible");
    cy.contains("Next").click();

    cy.contains("Know the Box Content").should("be.visible");
    cy.contains("Login").click();
  });

  it("shows login screen when not authenticated", () => {
    window.localStorage.setItem("viewedOnboarding", "true");
    cy.get("button").contains("Sign In with").should("be.visible");
    cy.get("button").contains("Google").should("be.visible");
  });

  // TODO: This test is failing
  it("can login with google", () => {
    window.localStorage.setItem("viewedOnboarding", "true");

    const username = Cypress.env("GOOGLE_USER");
    const password = Cypress.env("GOOGLE_PW");
    const loginUrl = Cypress.env("SITE_NAME");
    const cookieName = Cypress.env("COOKIE_NAME");
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,
      loginSelector: `a[href="${Cypress.env(
        "SITE_NAME"
      )}/api/auth/signin/google"]`,
      postLoginSelector: ".unread-count",
    };

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }: any) => {
        cy.clearCookies();

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop();
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          });

          Cypress.Cookies.defaults({
            preserve: cookieName,
          });

          // remove the two lines below if you need to stay logged in
          // for your remaining tests
          // cy.visit("/api/auth/signout");
          // cy.get("form").submit();

          cy.visit("/");
          cy.contains("Home").should("be.visible");
        }
      });
  });
});
