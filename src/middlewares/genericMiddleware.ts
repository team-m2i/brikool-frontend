import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest
} from 'next/server'

import { CustomMiddleware } from './chain'

export function withMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {

        // Add your middleware here and call the next middleware
        // Call the next middleware and pass the request and response
        return middleware(request, event, response)
    }
}