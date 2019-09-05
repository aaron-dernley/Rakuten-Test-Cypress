import faker from "faker";
import * as _ from "lodash";

Cypress.Commands.add('registerNewUser', () => {
    cy.visit('/registrations/new');
    const email = faker.name.firstName() + faker.name.lastName() + '@example.com'; // use faker to generate a random name with @example email address for reusability
    const password = 'Testing123';

    cy.get('input[name="email"][type="email"]').type(email); // had to use both input and type as there was no unique id
    cy.get('[name="emailConfirmation"]').type(email);
    cy.get('.card--register input.form__item__input[type="password"]').type(password);
    cy.get('#opt_in_register').click({force:true}); // force true on the click to check the box
    cy.get('#terms_check_register').click({force:true}); // force true again
    cy.get('.terms-conditions__link').should('have.text', 'I accept the terms of use, I have read the Privacy Policy and Cookie Policy, I accept the Contractual Conditions.');
    cy.get('.card--register .form__submit button').should('not.have.class', 'button--inactive').click(); // make sure submit register form button isn't inactive

});

Cypress.Commands.add('visitLoginUser', () => {
    cy.visit('/sessions/sign_in');
    cy.get('.card--login input[name="email"]').type('test.111@example.com'); // use card--login to specify form on the login card rather than the register form
    cy.get('.card--login input[name="password"][type="password"]').type('123Testing');
    cy.get('.card--login .form__submit').click();
});

Cypress.Commands.add('fillLogin', () => {
    cy.get('.card--login input[name="email"]').type('test.111@example.com'); // use card--login to specify form on the login card rather than the register form
    cy.get('.card--login input[name="password"][type="password"]').type('123Testing');
    cy.get('.card--login .form__submit').click();
    cy.wait(2000);
});