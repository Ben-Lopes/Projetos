describe('Site de Compras', () => {
    beforeEach(() => {
        cy.loginSimples();
    });
    it('Adicionar item ao carrinho e efetua compra', () => {
        cy.get('[data-test="title"]').should('be.visible'); // Como essa aplicação não possui rotas para usar o request, apenas verifico se o 
                                                            // título está visível como forma de "Assert".

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();

        cy.get('[data-test="firstName"]').type('Ben');
        cy.get('[data-test="lastName"]').type('Lopes');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('[data-test="continue"]').click();

        cy.get('[data-test="finish"]').click();
        cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!'); // Verificando se a mensagem de sucesso é exibida como forma de "Assert".
        cy.get('[data-test="back-to-products"]').click();
    });
});