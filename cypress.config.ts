const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents() {
      // Adicione eventos personalizados, se necessário
    },
    baseUrl: 'http://localhost:3000', // Substitua pelo URL do seu projeto
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Padrão de arquivo de teste
  },
});
