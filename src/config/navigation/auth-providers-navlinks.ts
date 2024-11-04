type TProviderNavLink =  {
    id: string,
    title: string,
    icon: string
}


const authProvidersNavLinks: TProviderNavLink[] = [
    {
        id: "google",
        title: "Google",
        icon: "/assets/images/icons/google.svg"
    },
    {
        id: "facebook",
        title: "Facebook",
        icon: "/assets/images/icons/facebook.svg"
    },
    {
        id: "github",
        title: "Github",
        icon: "/assets/images/icons/github.svg"
    }
]

export { type TProviderNavLink, authProvidersNavLinks}