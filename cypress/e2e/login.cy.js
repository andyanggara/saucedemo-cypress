import Login from "../pageObjects/login.cy";

describe("Login Test", () => {
    const password = "secret_sauce";
    const username = "standard_user";
    const lockedUser = "locked_out_user";
    const wrongUser = "x";
    const wrongPass = "x";
    const blankUser = "Epic sadface: Username is required";
    const blankPass = "Epic sadface: Password is required";
    const notMatch = "Epic sadface: Username and password do not match any user in this service";
    const lockUser = "Epic sadface: Sorry, this user has been locked out.";
    const obj = new Login();

    beforeEach(() => {
        cy.visit("/");
    });

    it("Login with valid username and password", () => {
        cy.login(username, password);

        cy.url().should("include", "/inventory.html");
        obj.clickMenu();
        obj.verLogoutButton();
    });

    it("Login with blank username and password", () => {
        obj.clickLogin();

        obj.verErrMessage(blankUser);
    });

    it("Login with blank username", () => {
        obj.setPassword(password);
        obj.clickLogin();

        obj.verErrMessage(blankUser);
    });

    it("Login with blank password", () => {
        obj.setUsername(username);
        obj.clickLogin();

        obj.verErrMessage(blankPass);
    });

    it("Login with wrong username", () => {
        obj.setUsername(wrongUser);
        obj.setPassword(password);
        obj.clickLogin();

        obj.verErrMessage(notMatch);
    });

    it("Login with wrong password", () => {
        obj.setUsername(username);
        obj.setPassword(wrongPass);
        obj.clickLogin();

        obj.verErrMessage(notMatch);
    });

    it("Login with locked user", () => {
        obj.setUsername(lockedUser);
        obj.setPassword(password);
        obj.clickLogin();

        obj.verErrMessage(lockUser);
    });

    // it.only("test", () => {
    //     cy.login(username, password);
    // });

    // it("test", () => {
    //     obj.successLogin();
    //     cy.get(".product_sort_container").select("za");
    //     cy.get('[value="za"]').should("have.text", "Name (Z to A)");
    // });
});
