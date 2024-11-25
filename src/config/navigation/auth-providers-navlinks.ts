type TProviderNavLink =  {
    id: string,
    title: {
        ar: string,
        fr: string,
        en: string
    },
    icon: string
}


const authProvidersNavLinks: TProviderNavLink[] = [
    {
        id: "google",
        title: {
            ar: "جوجل",
            fr: "Google",
            en: "Google"
        },
        icon: "/assets/images/icons/google.svg"
    },
    {
        id: "facebook",
        title: {
            ar: "فيسبوك",
            fr: "Facebook",
            en: "Facebook"
        },
        icon: "/assets/images/icons/facebook.svg"
    },
    {
        id: "github",
        title: {
            ar: "جيت هاب",
            fr: "Github",
            en: "Github"
        },
        icon: "/assets/images/icons/github.svg"
    }
]

export { type TProviderNavLink, authProvidersNavLinks}