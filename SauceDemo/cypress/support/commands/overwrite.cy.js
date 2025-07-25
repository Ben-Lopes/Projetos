Cypress.Commands.overwrite('request', (originalFn, ...args) => {
  // Se for um objeto de opções, insere timeout se não tiver
  if (typeof args[0] === 'object') {
    args[0].timeout = args[0].timeout || 90000; // 60 segundos padrão
  }

  // Se for chamado com método, url, body (ex: request('POST', '/url', body))
  if (typeof args[0] === 'string' && typeof args[1] === 'string') {
    if (typeof args[2] === 'object') {
      args[2].timeout = 90000;
    }
  }

  return originalFn(...args);
});