/// <reference types="Cypress" />

describe('Newsletter', () => {
  before(() => {
    cy.task('seedDatabase')
  })

  it('should display a success message', () => {
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe') // intercept any HTTP request localhost:3000/newsletter
    cy.visit('/')
    //There is a bug related type so we should click first and then type
    cy.get('[data-cy="newsletter-email"]').click()
    cy.get('[data-cy="newsletter-email"]').type('test@example.com')
    cy.get('[data-cy="newsletter-submit"]').click()
    cy.wait('@subscribe')
    cy.contains('Thanks for signing up!')
  })

  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', {
      message: 'Email exists already.',
    }).as('subscribe') // intercept any HTTP request localhost:3000/newsletter
    cy.visit('/')
    //There is a bug related type so we should click first and then type
    cy.get('[data-cy="newsletter-email"]').click()
    cy.get('[data-cy="newsletter-email"]').type('test@example.com')
    cy.get('[data-cy="newsletter-submit"]').click()
    cy.wait('@subscribe')
    cy.contains('Email exists already.')
  })

  it('should successfully create a new contact', () => {
    cy.request({
      method: 'POST',
      url: '/newsletter',
      body: { email: 'test@example.com' },
      form: true,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })
})
