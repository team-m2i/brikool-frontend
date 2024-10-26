import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest
} from 'next/server'
import { CustomMiddleware } from './chain'
import createMiddleware from "next-intl/middleware";
import {routing} from "@/i18n/routing";

export function withI18nMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
        // The first middleware in the chain has to create the response

        // Internationalisation with next-intl middleware
        const handleI18nRouting = createMiddleware(routing);
        console.log("middleware ai18n called")
        let response = NextResponse.next()
        try {
            response = handleI18nRouting(request)
        }catch (e){
            console.log("error in i18n middleware", e)
        }

        // Call the next middleware and pass the request and response
        return middleware(request, event, response)
    }
}