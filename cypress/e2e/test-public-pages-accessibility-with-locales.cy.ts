describe('Public Web Pages accessibility', () => {
  it('passes', () => {
    cy.visit('/en')
    cy.visit("/fr")
    cy.visit("/ar")
  })
  it("passes", () => {
    cy.visit("/en/auth/flow/login")
    cy.visit("/fr/auth/flow/login")
    cy.visit("/ar/auth/flow/login")
  })
  it("passes", () => {
    cy.visit("/en/auth/flow/register")
    cy.visit("/ar/auth/flow/register")
    cy.visit("/fr/auth/flow/register")
  })
  it("passes", () => {
    cy.visit("/en/auth/config/forgot-password")
    cy.visit("/fr/auth/config/forgot-password")
    cy.visit("/ar/auth/config/forgot-password")
  })
  it("passes", () => {
    cy.visit("/en/terms-and-privacy")
    cy.visit("/fr/terms-and-privacy")
    cy.visit("/ar/terms-and-privacy")
  })
  it("passes", () => {
    cy.visit("/en/error")
    cy.visit("/ar/error")
    cy.visit("/fr/error")
  })
  it("passes", () => {
    cy.visit("/en/not-found")
    cy.visit("/ar/not-found")
    cy.visit("/fr/not-found")
  })
  it("passes", () => {
    cy.visit("/en/access-denied")
    cy.visit("/fr/access-denied")
    cy.visit("/ar/access-denied")
  })
})