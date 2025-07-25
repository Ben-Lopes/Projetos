const { defineConfig } = require("cypress");
const dotenv  = require("dotenv");
const cypress = require("cypress");

module.exports = defineConfig({
  projectId: 'Testes Gerais',
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
    baseUrl: 'https://demo.applitools.com',
    chromeWebSecurity: false,
    defaultCommandTimeout: 90000, // para cy.get, cy.click, cy.wait, etc
    requestTimeout: 90000, // para envio de cy.request
    responseTimeout: 90000, // para resposta de cy.request

  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
  },
});
