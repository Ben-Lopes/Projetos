Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('GeolocationPositionError')) {
        return false; // Ignora se ocorrer erro de geolocalização
    }

    return true;
});