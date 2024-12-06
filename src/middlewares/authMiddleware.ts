import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'
import {PUBLIC_ROUTES} from "@/config/routes/public-routes";
import {PROTECTED_ROUTES} from "@/config/routes/protected-routes";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {getToken} from "@auth/core/jwt";
import {TSignInResponseModel} from "@/definitions/models/auth-flow-model-schema";
import {
    checkRouteAuthorization,
    getDecodedToken, getLoggedInUser,
    redirectRequest
} from "@/lib/utils";
import {ADMIN_ROUTES} from "@/config/routes/RBAC/admin-routes";
import {FREELANCER_ROUTES} from "@/config/routes/RBAC/freelancer-routes";
import {CLIENT_ROUTES} from "@/config/routes/RBAC/client-routes";
import {staticNavLinks} from "@/config/navigation/static-navlinks";

export function withAuthMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        const token = await getToken({ req: request, secret: process.env.AUTH_SECRET }) as TSignInResponseModel
        const isPublicRoutes = checkRouteAuthorization(PUBLIC_ROUTES, request.url)
        const isProtectedRoute = checkRouteAuthorization(PROTECTED_ROUTES, request.url)
        console.log("-> is public route", isPublicRoutes)
        console.log("-> is protected route", isProtectedRoute)
        if(isProtectedRoute) {
            const token = await  getDecodedToken(request)
            const user = await getLoggedInUser(request)

            // STEP1: Redirect new user to new freelancer page if user has role freelancer
            if(token) {
                if ( user?.newUser && !request.url.includes(authFlowNavLinks.newFreelancer.href) && token.role === 'Freelancer') {
                    return redirectRequest(request, authFlowNavLinks.newFreelancer.href)
                }
            }

            // STEP2 : Redirect user to login page if not logged in
            if (!token && !request.url.includes(authFlowNavLinks.singIn.href)) {
                return redirectRequest(request, authFlowNavLinks.singIn.href)
            }

            const isAdminRoute = checkRouteAuthorization(ADMIN_ROUTES, request.url)
            const isFreeLancerRoute = checkRouteAuthorization(FREELANCER_ROUTES, request.url)
            const isClientRoute = checkRouteAuthorization(CLIENT_ROUTES, request.url)

            console.log("-> is admin route", isAdminRoute)
            console.log("-> is freelancer route", isFreeLancerRoute)
            console.log("-> is client route", isClientRoute)

            // STEP3: RBAC - Role Based Access Control
            if(token) {
                console.log("-----------------RBAC-----------------")
                if(isAdminRoute && token.role !== 'Admin') {
                    // Access Denied Page
                    console.log("\\:>--------> Admin route access denied")
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
                if(isFreeLancerRoute && token.role !== 'Freelancer') {
                    // Access Denied Page
                    console.log("\\:>--------> Freelancer route access denied")
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
                if(isClientRoute && token.role !== 'Client') {
                    // Access Denied Page
                    console.log("\\:>--------> Client route access denied")
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
            }
        }

            return middleware(request, event, response)
        }
}