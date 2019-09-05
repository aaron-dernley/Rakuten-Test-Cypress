var viewports = ["macbook-15"] // set the viewport for all tests, can be used for multiple viewports - also changed because the nav header wasn't loading on the default

viewports.forEach((viewport) => {

    describe('Rakuten test scenarios exercise', () => {

        context('log in tests', () => {

            before('test run set up', () => {
                cy.viewport(viewport); // set viewport before running tests
                cy.visit(''); // visit baseUrl which is set as the homepage (UK as I couldn't create an account on ES)
                cy.checkCookieBanner().then(() => { // both cookie banner commands located in commands.js - check content, then close and confirm it's closed
                    cy.closeCookieBanner();
                });
            });

            it('load homepage, close cookie banner then log in', () => {
               cy.get('[data-test-id="menu-desktop-login-link"]').should('have.text', 'Sign in').click(); // get the sign in button, check text then click
               cy.url().should('eq', Cypress.config('baseUrl') + '/sessions/sign_in'); // get current url and ensure it's correct
               cy.get('.card--login input[name="email"]').type('test.111@example.com'); // use card--login to specify form on the login card rather than the register form
               cy.get('.card--login input[name="password"][type="password"]').type('123Testing');
               cy.get('.card--login .form__submit').click();
               cy.url().should('eq', Cypress.config('baseUrl')); // ensure user is redirected to homepage after creating account and assert
               cy.get('.nav__items__user--logged').should('be.visible').then(() => { // checked the logged in section of the header and assert
                cy.get('.navmenu__parent--profile').should('be.visible');
                });
            });

        });

    });

});