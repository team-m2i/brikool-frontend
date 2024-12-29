describe("Test Forgot Password Form Behavior", () => {
    it("passes", () => {
        cy.visit("/en/auth/config/forgot-password")
        cy.get("input[name='email']").type("yyyy")
        cy.get("button[type='submit']").click()
        cy.contains("The email you entered is not valid")

        cy.intercept('POST', '/en/auth/config/forgot-password').as('forgotPasswordRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("button[type='submit']").click()
        cy.wait('@forgotPasswordRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")
    })
    it("passes", () => {
        cy.visit("/ar/auth/config/forgot-password")
        cy.get("input[name='email']").type("bbbb")
        cy.get("button[type='submit']").click()
        cy.contains("البريد الإلكتروني الذي أدخلته غير صالح")

        cy.intercept('POST', '/ar/auth/config/forgot-password').as('forgotPasswordRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("button[type='submit']").click()
        cy.wait('@forgotPasswordRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")
    })
    it("passes", () => {
        cy.visit("/fr/auth/config/forgot-password")
        cy.get("input[name='email']").type("ffff")
        cy.get("button[type='submit']").click()
        cy.contains("L'adresse email que vous avez saisie n'est pas valide")

        cy.intercept('POST', '/fr/auth/config/forgot-password').as('forgotPasswordRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("button[type='submit']").click()
        cy.wait('@forgotPasswordRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")

    })
})