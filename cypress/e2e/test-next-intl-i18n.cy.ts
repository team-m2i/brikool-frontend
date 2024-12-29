describe("", () => {
    it("passes", () => {
        cy.visit('/en')
        cy.contains("Welcome To")

        cy.visit("/fr")
        cy.contains("Bienvenue Chez")

        cy.visit("/ar")
        cy.contains("مرحبًا بك في")

    })
    it("passes", () => {
        cy.visit("/en/auth/flow/login")
        cy.contains("Hey friend! Welcome back")

        cy.visit("/fr/auth/flow/login")
        cy.contains("Salut mon ami! Bon retour")

        cy.visit("/ar/auth/flow/login")
        cy.contains("مرحبًا صديقي! مرحبًا بعودتك")
    })
    it("passes", () => {
        cy.visit("/en/auth/flow/register")
        cy.contains("Register")

        cy.visit("/ar/auth/flow/register")
        cy.contains("تسجيل")

        cy.visit("/fr/auth/flow/register")
        cy.contains("S'inscrire")
    })
    it("passes", () => {
        cy.visit("/en/auth/config/forgot-password")
        cy.contains("Forgot your password?")

        cy.visit("/fr/auth/config/forgot-password")
        cy.contains("Mot de passe oublié ?")

        cy.visit("/ar/auth/config/forgot-password")
        cy.contains("هل نسيت كلمة المرور؟")
    })
    it("passes", () => {
        // TODO: Add i18n support for these pages
        cy.visit("/en/terms-and-privacy")
        cy.visit("/fr/terms-and-privacy")
        cy.visit("/ar/terms-and-privacy")
    })
    it("passes", () => {
        cy.visit("/en/error")
        cy.contains("Unexpected Error")

        cy.visit("/ar/error")
        cy.contains("خطأ غير متوقع")

        cy.visit("/fr/error")
        cy.contains("Erreur Inattendue")
    })
    it("passes", () => {
        cy.visit("/en/not-found")
        cy.contains("Page Not Found")

        cy.visit("/ar/not-found")
        cy.contains("الصفحة غير موجودة")

        cy.visit("/fr/not-found")
        cy.contains("Page Introuvable")
    })
    it("passes", () => {
        cy.visit("/en/access-denied")
        cy.contains("Access Restricted")

        cy.visit("/fr/access-denied")
        cy.contains("Accès Restreint")

        cy.visit("/ar/access-denied")
        cy.contains("الوصول ممنوع")
    })
})