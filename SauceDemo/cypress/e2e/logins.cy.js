describe('Site de Compras', () => {
    it('Efetua login com usuário válido', () => {
        cy.loginSimples();
        cy.get('[data-test="title"]').should('be.visible'); // Como essa aplicação não possui rotas para usar o request, apenas verifico se o 
                                                            // título está visível como forma de "Assert".
    });
    it('Tentar efetuar login com usuário bloqueado', () => {
        cy.loginBloqueado();
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Sorry, this user has been locked out.'); // Verificando se a mensagem de erro é exibida como forma de "Assert".
    });
});