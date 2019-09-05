// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("checkCookieBanner", () => {
    cy.get('.nav__cookies').should('be.visible'); // check that the cookie banner has loaded
    cy.get('.nav__cookies__message__text').should('have.text', 'We use our own and third-party cookies allowing us to offer you a better user experience and ads related to your navigation habits. By using Rakuten TV, you\'re accepting our cookies policy. For more information, please refer to our privacy policy and cookies.'); // risky as this could change freqeuently
});

Cypress.Commands.add("closeCookieBanner", () => {
    cy.get('button.button--minw').click().then(() => {
        cy.get('.nav__cookies').should('not.be.visible');
    });
});

