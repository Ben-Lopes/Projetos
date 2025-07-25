Cypress.Commands.add('loginBloqueado', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
});