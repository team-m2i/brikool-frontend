import NextAuth, {NextAuthConfig} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {BACKEND_SERVER_NAME} from "@/lib/constants";
import {TSignInSchema} from "@/definitions/schema/auth-flow-schema";
import {customSignIn, refreshToken} from "@/data-access/auth-flow";
import {TSignInResponseModel} from "@/definitions/models/auth-flow-model-schema";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {decode} from "jsonwebtoken";

export const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            id: BACKEND_SERVER_NAME,
            name: "Spring Boot",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                refreshToken:{label: "refreshToken", type: "text"}
            },
            authorize: async (credentials) => {
                if (credentials) {

                    if(credentials?.refreshToken) {
                        // refresh session with refresh token
                        const session  = await refreshToken(credentials.refreshToken as string);
                        console.log("----> session is updated? ",session != null)
                        if(session) {
                            return {...session.user, jwt: session.jwt}
                        }else {
                            console.error("Failed to refresh token");
                        }
                    }
                    if(credentials?.email && credentials.password) {
                        // Log in with credentials
                        const signInData: TSignInSchema = {
                            email: credentials.email as string,
                            password: credentials.password as string
                        };

                        try {
                            const res = await customSignIn(signInData);
                            if (res.ok) {
                                const data: TSignInResponseModel | null = await res.json();
                                if (data?.jwt) {

                                    return {...data.user, jwt: data.jwt};
                                } else {
                                    console.error("Authorization failed:", data);
                                }
                            } else {
                                console.error("Failed to sign in:", res.statusText);
                            }
                        } catch (error) {
                            console.error("Error during sign-in:", error);
                        }
                    }
                }else {
                    // No credentials provided
                    console.error("Refresh token not found - No credentials provided for sign-in");
                }
                return null
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname.includes("/profile")) return !!auth;
            return true;
        },
        jwt({ token, user }) {
            if(user){
                const decodedToken = decode(user?.jwt.access_token);
                return {user: {...user}, exp: decodedToken?.exp}
            }
            return token
        },
        async session({ session, token }) {
            if(token)
                return {...session, ...token}
            return session
        },
    },
    pages: {
        signIn: authFlowNavLinks.singIn.href,
    },
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);