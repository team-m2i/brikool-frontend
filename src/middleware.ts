import { chain } from '@/middlewares/chain'
import {withI18nMiddleware} from "@/middlewares/i18nMiddleware";


// Add your middlewares to the array to activate them
const middlewares = [ withI18nMiddleware]
export default chain(middlewares)

export const config = {
    // Match only internationalized pathNames
    matcher: ['/', '/(en|fr|ar)/:path*']
};