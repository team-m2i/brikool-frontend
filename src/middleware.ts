import { chain } from '@/middlewares/chain'
import {withI18nMiddleware} from "@/middlewares/i18nMiddleware";
import {withAuthMiddleware} from "@/middlewares/authMiddleware";


// Add your middlewares to the array to activate them
const middlewares = [ withI18nMiddleware, withAuthMiddleware]
export default chain(middlewares)

export const config = {
    // Match only internationalized pathNames
    matcher: ['/', '/(en|fr|ar)/:path*']
};