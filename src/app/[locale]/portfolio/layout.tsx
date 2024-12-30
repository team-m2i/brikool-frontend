import React, { Suspense, ReactNode } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import HeaderSimple from "@/components/HeaderSimple";
export default function Layout({children}: {children: ReactNode})
{

    return (
        <>
            <HeaderSimple/>
            <Suspense fallback={<div>Loading...</div>}>
            </Suspense>
            {children}
        </>
    );
}
