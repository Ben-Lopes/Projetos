Describe('ACME', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.on('uncaught:exception', () => false);
    });

     /* Esse exemplo de teste apenas loga em uma aplicação web,
        esse app não faz nenhum tipo de validação de usuário ou senha.
        O teste é apenas para demonstrar como fazer um login com Cypress. */

    it('Login bem sucedido', () => {
      cy.intercept('GET', '/app.html').as('login');

      cy.get('#username').click().type("Ben-Lopes");
      cy.get('#password').type("Senha123");
      cy.get('#log-in').click();

      cy.wait('@login').then((interception) => {
          expect(interception.response.statusCode).to.eq(200); // O retorno 200  da rota '/app.html' indica sucesso
      });
    });
});
