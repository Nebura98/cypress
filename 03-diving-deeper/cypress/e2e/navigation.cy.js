/// <reference types="Cypress"/>

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('http://localhost:5173/')
    // cy.get('header a').last().click()
    cy.get('[data-cy="header-about-link"]').click() //Manera recomendada por el equipo de Cypress
    cy.location('pathname').should('equal', '/about') //Nos da el url, especificamos que
    cy.go('back') //Nos lleva a la pagina anterior
    cy.location('pathname').should('equal', '/')
    cy.get('[data-cy="header-about-link"]').click()
    cy.get('[data-cy="header-home-link"]').click()
    cy.location('pathname').should('equal', '/')
  })
})
