import React, {ReactNode} from 'react';
import {auth} from "@/lib/auth";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {redirect} from "@/i18n/routing";
import { getLocale } from 'next-intl/server';

async function Layout({children}: { children: ReactNode }) {
    const session = await auth()
    const locale = await getLocale();
    if(session?.user){
        redirect({href:authFlowNavLinks.postSignIn.href, locale})
    }
    return (
        <>
            {children}
        </>
    );
}

export default Layout;