describe('Private Web Pages redirection', () => {
    it("passes", () => {

        cy.clearAllCookies()

        cy.visit("/en/dashboard/freelancer")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/fr/dashboard/freelancer")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/ar/dashboard/freelancer")
        cy.url().should('include', '/auth/flow/login')

    })
    it("passes", () => {
        cy.clearAllCookies()

        cy.visit("/en/dashboard/admin")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/fr/dashboard/admin")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/ar/dashboard/admin")
        cy.url().should('include', '/auth/flow/login')
    })
    it("passes", () => {
        cy.clearAllCookies()

        cy.visit("/en/user")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/fr/user")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/ar/user")
        cy.url().should('include', '/auth/flow/login')
    })
    it("passes", () => {
        cy.clearAllCookies()

        cy.visit("/en/announces")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/fr/announces")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/ar/announces")
        cy.url().should('include', '/auth/flow/login')
    })
    it("passes", () => {
        cy.clearAllCookies()

        cy.visit("/en/portfolio/1")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/fr/portfolio/1")
        cy.url().should('include', '/auth/flow/login')

        cy.visit("/ar/portfolio/1")
        cy.url().should('include', '/auth/flow/login')
    })
})