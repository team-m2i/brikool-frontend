import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            id: "springboot",
            name: "Spring Boot",
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
                name: {},

            },
            authorize: async (credentials) => {
                let user = null
                console.log("Authjs called with credentials: ", credentials)
                // logic to salt and hash password
                const pwHash =credentials.password

                // logic to verify if the user exists
                user = await getUserFromDb(credentials.email as string, pwHash as string)

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
    ],
})

const getUserFromDb = async (email: string, pwHash: string) => {
    // logic to get user from database
    return {
        id: "1",
        name: "john doe",
        email: "john@doe.com",
        image: "/assets/profiles/1.jpg",
    }
}