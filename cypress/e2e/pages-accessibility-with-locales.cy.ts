describe('template spec', () => {
  it('passes', () => {

    cy.visit('/en')
    cy.visit("/fr")
    cy.visit("/ar")

    cy.visit("/en/auth/flow/login")
    cy.visit("/fr/auth/flow/login")
    cy.visit("/ar/auth/flow/login")

    cy.visit("/en/auth/flow/register")
    cy.visit("/ar/auth/flow/register")
    cy.visit("/fr/auth/flow/register")

    cy.visit("/en/auth/new/new-freelancer")
    cy.visit("/ar/auth/new/new-freelancer")
    cy.visit("/fr/auth/new/new-freelancer")

    cy.visit("/en/auth/config/forgot-password")
    cy.visit("/fr/auth/config/forgot-password")
    cy.visit("/ar/auth/config/forgot-password")

    cy.visit("/en/terms-and-privacy")
    cy.visit("/fr/terms-and-privacy")
    cy.visit("/ar/terms-and-privacy")

    cy.visit("/en/error")
    cy.visit("/ar/error")
    cy.visit("/fr/error")

    cy.visit("/en/not-found")
    cy.visit("/ar/not-found")
    cy.visit("/fr/not-found")

    cy.visit("/en/access-denied")
    cy.visit("/fr/access-denied")
    cy.visit("/ar/access-denied")
  })
})