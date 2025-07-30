describe('', () => {
  it('Pega o ultimo e-mail', () => {
    cy.request('http://localhost:3000/email').then((response) => {
      expect(response.status).to.eq(200);

      // Apenas para listar o conteudo obtido do ultimo e-mail
      cy.log('Assunto', response.body.subject);
      cy.log('Remetente', response.body.from);
      cy.log('Conteúdo', response.body.body);
    })
  })
})