const cypress = require('cypress');
const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

module.exports = defineConfig({
  projectId: 'obtenção-email',
  e2e: {
    setupNodeEvents(on, config) {
      const env = dotenv.config().parsed;

      config.env = {
        ...config.env,
        ...env,
        hideXhr: true,
      };

      config.viewportWidth = 1920;
      config.viewportHeight = 1080;

      return config;
    },
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    requestTimeout: 90000, // para envio de cy.request
    responseTimeout: 90000, // para resposta de cy.request
  },
});