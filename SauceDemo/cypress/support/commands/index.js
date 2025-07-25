Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('GeolocationPositionError')) {
    return false;
  }

  // Permitir que outros erros continuem a falhar o teste
  return true;
});
