describe("Test Login Form Behavior", () => {
    it("passes", () => {
        cy.visit("/en/auth/flow/login")
        cy.get("input[name='email']").type("yyyy")
        cy.get("input[name='password']").type("xxxx")
        cy.get("button[type='submit']").click()
        cy.contains("Invalid email")
        cy.contains("Password must be at least 8 characters")

        cy.intercept('POST', '/en/auth/flow/login').as('loginRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("input[name='password']").clear().type("abcDEF123+")
        cy.get("button[type='submit']").click()
        cy.wait('@loginRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")
    })
    it("passes", () => {
        cy.visit("/ar/auth/flow/login")
        cy.get("input[name='email']").type("bbbb")
        cy.get("input[name='password']").type("bbbb")
        cy.get("button[type='submit']").click()
        cy.contains("بريد إلكتروني غير صالح")
        cy.contains("يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل")

        cy.intercept('POST', '/ar/auth/flow/login').as('loginRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("input[name='password']").clear().type("abcDEF123+")
        cy.get("button[type='submit']").click()
        cy.wait('@loginRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")
    })
    it("passes", () => {
        cy.visit("/fr/auth/flow/login")
        cy.get("input[name='email']").type("ffff")
        cy.get("input[name='password']").type("zzzd")
        cy.get("button[type='submit']").click()
        cy.contains("Email invalide")
        cy.contains("Le mot de passe doit comporter au moins 8 caractères")

        cy.intercept('POST', '/fr/auth/flow/login').as('loginRequest')

        cy.get("input[name='email']").clear().type("ali@gmail.com")
        cy.get("input[name='password']").clear().type("abcDEF123+")
        cy.get("button[type='submit']").click()
        cy.wait('@loginRequest')
        cy.get("[data-testid='toast-message']").should("be.visible")

    })
})