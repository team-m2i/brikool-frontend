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
import {redirectRequest} from "@/lib/utils";
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
        const isPublicRoutes = PUBLIC_ROUTES.filter(route => request.url.includes(route))
        const isProtectedRoute = PROTECTED_ROUTES.filter(route => request.url.includes(route))

        if(!isPublicRoutes) {
            // STEP1: Redirect new user to new freelancer page if user has role freelancer
            if(token) {
                if (token?.user?.newUser && !request.url.includes(authFlowNavLinks.newFreelancer.href)) {
                    return redirectRequest(request, authFlowNavLinks.newFreelancer.href)
                }
            }

            // STEP2 : Redirect user to login page if not logged in
            if (!token && isProtectedRoute && !request.url.includes(authFlowNavLinks.singIn.href)) {
                return redirectRequest(request, authFlowNavLinks.singIn.href)
            }

            const isAdminRoute = ADMIN_ROUTES.filter(route => route.includes(request.url))
            const isFreeLancerRoute = FREELANCER_ROUTES.filter(route => route.includes(request.url))
            const isClientRoute = CLIENT_ROUTES.filter(route => route.includes(request.url))

            // STEP3: RBAC - Role Based Access Control
            /*
            if(token) {
                if(isAdminRoute && token.user.role !== 'Admin') {
                    // Access Denied Page
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
                if(isFreeLancerRoute && token.user.role !== 'Freelancer') {
                    // Access Denied Page
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
                if(isClientRoute && token.user.role !== 'Client') {
                    // Access Denied Page
                    return redirectRequest(request, staticNavLinks.accessDenied.href)
                }
            }
            */
        }

            return middleware(request, event, response)
        }
}