describe("Login Scenario", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Verify login form successful appear", () => {
        cy.get('[data-test="username"]').should("be.visible");
        cy.get('[data-test="password"]').should("be.visible");
        cy.get('[data-test="login-button"]').should("be.visible");
    });

    it("Login with valid username and valid password", () => {
        cy.login("standard_user", "secret_sauce");
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    });

    it("Login with locked user", () => {
        cy.login("locked_out_user", "secret_sauce");
        cy.loginErrMessage("Epic sadface: Sorry, this user has been locked out.");
    });

    it("Login with problem user", () => {
        cy.login("problem_user", "secret_sauce");
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    });

    it("Login with performance glitch user", () => {
        let time = 0;
        cy.then(() => {
            time = Math.round(performance.now() / 1000);
        });
        cy.login("performance_glitch_user", "secret_sauce").then(() => {
            let loadTime = Math.round(performance.now() / 1000) - time;
            // cy.log(`duration: ${Math.round(performance.now() / 1000)} s`);
            expect(loadTime).to.be.greaterThan(5);
        });
    });

    it("Login without input username and password", () => {
        cy.get('[data-test="login-button"]').click();
        cy.loginErrMessage("Epic sadface: Username is required");
    });

    it("Login with valid username and empty password", () => {
        cy.get('[data-test="username"]').type("standard_user");
        cy.get('[data-test="login-button"]').click();
        cy.loginErrMessage("Epic sadface: Password is required");
    });

    it("Login with empty username and valid password", () => {
        cy.get('[data-test="password"]').type("secret_sauce");
        cy.get('[data-test="login-button"]').click();
        cy.loginErrMessage("Epic sadface: Username is required");
    });

    it("Login with invalid username and valid password", () => {
        cy.login("admin", "secret_sauce");
        cy.loginErrMessage("Epic sadface: Username and password do not match any user in this service");
    });

    it("Login with valid username and invalid password", () => {
        cy.login("standard_user", "admin");
        cy.loginErrMessage("Epic sadface: Username and password do not match any user in this service");
    });

    it("Login with invalid username and invalid password", () => {
        cy.login("admin", "admin");
        cy.loginErrMessage("Epic sadface: Username and password do not match any user in this service");
    });
});
