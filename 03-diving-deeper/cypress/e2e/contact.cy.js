/// <reference types="Cypress"/>

describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should submit the form', () => {
    // cy.get('[data-cy="contact-input-message"]').type('Some message')
    // cy.get('[data-cy="contact-input-name"]').type('Maria Juana')
    cy.getById('contact-input-message').type('Some message')
    cy.getById('contact-input-name').type('Maria Juana')
    // cy.get('[data-cy="contact-input-email"]').type('example@example.com')
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .and('not.have.attr', 'disabled') //and es lo mismo que Should no obstante es mas legible.
    cy.get('[data-cy="contact-btn-submit"]').then((element) => {
      //   element.attr('disabled')
      expect(element.attr('disabled')).to.be.undefined
      expect(element.text()).to.contain('Send Message')
      //   expect(element.text()).to.eq('Send Message')
    }) //Esto me retorna en el then un o unos elementos, dependiendo que estoy apuntando
    cy.screenshot() //Manera de tomar capturas de pantalla manualmente
    // cy.get('[data-cy="contact-input-email"]').type('example@example.com') //Una tecla especial es el {enter}
    cy.getById('contact-input-email').type('example@example.com') //Custom query

    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn') //De esta manera se crea un alias para retutilizarlo
    cy.submitForm()
    // cy.get('@submitBtn').click()
    cy.get('@submitBtn').contains('Sending...')
    cy.get('@submitBtn').should('have.attr', 'disabled')
  })

  it('should validate the form input', () => {
    cy.get('[data-cy="contact-btn-submit"]').click()
    // cy.get('[data-cy="contact-btn-submit"]').contains('Send message') //Esto no he una buena practica
    cy.get('[data-cy="contact-btn-submit"]').then((element) => {
      expect(element).to.not.have.attr('disabled')
      expect(element).to.not.equal('Sending...')
    })
    cy.get('[data-cy="contact-btn-submit"]').contains('Send Message')

    //Lista de alias
    cy.get('[data-cy="contact-input-name"]').as('input-name')
    cy.get('[data-cy="contact-input-email"]').as('input-email')
    cy.get('[data-cy="contact-input-message"]').as('textarea-message')

    cy.get('@textarea-message').blur()
    // cy.get('@textarea-message')
    //   .parent()
    //   .then((element) => {
    //     expect(element.attr('class')).to.contains('invalid')
    //   })
    //Esta manera es mas recomendada y mas estable
    cy.get('@textarea-message')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/) //Expresiones regulares va encontrar donde sea en la clase si tiene invalid

    cy.get('@input-name').focus().blur()
    cy.get('@input-name')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/)

    cy.get('@input-email').focus().blur()
    cy.get('@input-email')
      .parent()
      .should('have.attr', 'class')
      .and('match', /invalid/)
  })
})
