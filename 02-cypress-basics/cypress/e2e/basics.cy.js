/**
 * La linea de abajo ayuda a VS al autocompletado
 */
/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173')
    //Manera erronea
    // cy.get('.main-header').get('img')
    //Manera correcta
    cy.get('.main-header').find('img')
    // cy.get('.main-header img') De esta manera tambien funciona
  })

  it('should display the page title', () => {
    cy.visit('http://localhost:5173')
    //Debe de haber un h1 en la pantalla
    cy.get('h1').should('have.length', 1)
    cy.get('h1').contains('My Cypress Course Tasks')
  })
})
