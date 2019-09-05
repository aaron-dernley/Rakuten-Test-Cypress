import faker from 'faker'

var viewports = ["macbook-15"] // set the viewport for all tests, can be used for multiple viewports - also changed because the nav header wasn't loading on the default

viewports.forEach((viewport) => {

    describe('Rakuten test scenarios exercise', () => {

        context('create a new registered user', () => {

            before('test run set up', () => {
                cy.viewport(viewport); // set viewport before running tests
                cy.visit(''); // visit baseUrl which is set as the homepage (UK as I couldn't create an account on ES)
                cy.checkCookieBanner().then(() => { // both cookie banner commands located in commands.js - check content, then close and confirm it's closed
                    cy.closeCookieBanner();
                });
            });

            it('load homepage, close cookie banner then register a new user', () => {
                cy.get('[data-test-id="menu-desktop-register-link"]').should('have.text', 'Register').click(); // get register button, confirm correct text then click
                cy.url().should('eq', Cypress.config('baseUrl') + '/registrations/new'); // get current url and ensure it's correct
                cy.get('.card--register').should('be.visible'); // check that the registration form is visible
                cy.get('.card--login').should('not.be.visible').and('have.class', 'card--hidden'); // check the sign in form isn't visible
                cy.get('.card--register .form__submit button').should('have.class', 'button--inactive'); // make sure submit register form button is inactive

                const email = faker.name.firstName() + faker.name.lastName() + '@example.com'; // use faker to generate a random name with @example email address for reusability
                const password = 'Testing123';

                cy.get('input[name="email"][type="email"]').type(email); // had to use both input and type as there was no unique id
                cy.get('[name="emailConfirmation"]').type(email);
                cy.get('.card--register input.form__item__input[type="password"]').type(password);
                cy.get('#opt_in_register').click({force:true}); // force true on the click to check the box
                cy.get('#terms_check_register').click({force:true}); // force true again
                cy.get('.terms-conditions__link').should('have.text', 'I accept the terms of use, I have read the Privacy Policy and Cookie Policy, I accept the Contractual Conditions.');
                cy.get('.card--register .form__submit button').should('not.have.class', 'button--inactive').click(); // make sure submit register form button isn't inactive
                cy.url().should('eq', Cypress.config('baseUrl')); // ensure user is redirected to homepage after creating account and assert
                cy.get('.nav__items__user--logged').should('be.visible').then(() => { // checked the logged in section of the header and assert
                    cy.get('.navmenu__parent--profile').should('be.visible');
                });
            });

        });

    });

});