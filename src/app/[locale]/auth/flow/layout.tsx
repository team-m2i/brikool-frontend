import React, {ReactNode} from 'react';
import {auth} from "@/lib/auth";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {redirect} from "@/i18n/routing";

async function Layout({children}: { children: ReactNode }) {
    const session = await auth()
    if(session?.user){
        redirect(authFlowNavLinks.profile.href)
    }
    return (
        <>
            {children}
        </>
    );
}

export default Layout;