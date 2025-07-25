Cypress.Commands.add('loginSimples', () => { // Esse comando customizado usa o .env apenas de exemplpo de boa prática.
  cy.visit('/');
  cy.get('[data-test="username"]').type(Cypress.env('USERNAME'));
  cy.get('[data-test="password"]').type(Cypress.env('PASSWORD'));
  cy.get('[data-test="login-button"]').click();
});