var viewports = ["macbook-15"] // set the viewport for all tests, can be used for multiple viewports - also changed because the nav header wasn't loading on the default

viewports.forEach((viewport) => {

    describe('Rakuten test scenarios exercise', () => {

        context('search and content check tests', () => {

            before('test run set up', () => {
                cy.viewport(viewport); // set viewport before running tests
                cy.visit(''); // visit baseUrl which is set as the homepage (UK as I couldn't create an account on ES)
                cy.checkCookieBanner().then(() => { // both cookie banner commands located in commands.js - check content, then close and confirm it's closed
                    cy.closeCookieBanner();
                });
                //cy.loginUser();
                //cy.wait(3000); //not keen on using waits but for times sake I popped this here to ensure homepage is reached before tests run
            });

            it('search test', () => {
                cy.get('.search__box__input').type('The X-Files{enter}');
                cy.url().should('eq', Cypress.config('baseUrl') + '/search/The%20X-Files'); // get current url and ensure it's correct
                cy.get('.list__item--movies a[href="/uk/movies/the-x-files"]').click();
                cy.url().should('eq', Cypress.config('baseUrl') + '/movies/the-x-files'); // confirm navigation
            });
            it('confirm movie page content test', () => { // check page contents
                cy.get('.detail__hero').should('be.visible');
                cy.get('.round-action--trailer').should('be.visible');
                cy.get('.round-action--wishlist').should('be.visible');
                cy.get('.detail__data__meta__title').should('be.visible').and('contain', 'The X-Files');
                cy.get('.orderselect').should('be.visible').and('contain', 'Watch now');
                cy.get('.detail__actions__redeem').should('be.visible').and('contain', 'Redeem voucher');
                cy.get('.detail__content__block--low').should('be.visible');
                cy.get('.detail__content__block--large').should('be.visible');
                cy.get('.section--recommendations').should('be.visible').and('contain', 'More movies you may like');
                cy.get('.button--tagged-seen').should('be.visible');
                cy.get('.button--tagged-twitter').should('be.visible');
                cy.get('.button--tagged-facebook').should('be.visible');
                cy.get('.button--tagged-pinterest').should('be.visible');
            });
            it('add to wishlist test', () => {                
                cy.get('.round-action--wishlist').should('contain', 'Add to Wishlist').click()
                cy.fillLogin();
                cy.get('.round-action--wishlist').should('contain', 'Remove from Wishlist');
                cy.visit('wishlist/');
                cy.get('.list__item--movies a[href="/uk/movies/the-x-files"]').should('be.visible');
            });

        });

    });

});