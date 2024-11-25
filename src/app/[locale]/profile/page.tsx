import React from 'react';
import {auth} from "@/lib/auth";
import Link from "next/link";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

async function Page() {
    const session = await auth()
    return (
        <div>
            profile page
            {
                session && JSON.stringify(session)
            }

            <Link href={authFlowNavLinks.signOut.href}>Sign Out</Link>
        </div>
    );
}

export default Page;