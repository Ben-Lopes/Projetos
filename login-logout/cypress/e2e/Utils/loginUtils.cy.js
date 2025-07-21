function login() {
    cy.intercept('GET', '/app.html').as('login');

    cy.get('#username').click().type("Ben-Lopes");
    cy.get('#password').type("Senha123");
    cy.get('#log-in').click();

    cy.wait('@login').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
}