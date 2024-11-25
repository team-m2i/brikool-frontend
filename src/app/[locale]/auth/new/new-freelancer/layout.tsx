"use client"

import {NewFreelancerFormContextProvider} from "@/context/multisteps-newuser-context";
import {ReactNode} from "react";

function Layout({children}: {children: ReactNode}) {
    return (
        <NewFreelancerFormContextProvider>
            {children}
        </NewFreelancerFormContextProvider>
    );
}

export default Layout;