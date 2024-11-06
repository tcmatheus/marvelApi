// cypress/e2e/heroList.cy.js
describe('Testes E2E para HeroList', () => {
    beforeEach(() => {
      cy.visit('/'); // Substitua pela URL ou rota inicial da sua aplicação, se necessário
    });
  
    it('Deve carregar a lista de heróis', () => {
      cy.get('.hero-cards-grid').should('exist');
      cy.get('.hero-card').should('have.length.greaterThan', 0);
    });
  
    it('Deve abrir o modal ao clicar em um herói', () => {
      cy.get('.hero-card').first().click();
      cy.get('.hero-modal').should('be.visible');
      cy.get('.close-button').click();
      cy.get('.hero-modal').should('not.exist');
    });
  });