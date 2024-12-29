import React, { Suspense, ReactNode } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLaout";
export default function Layout({children}: {children: ReactNode})
{

    return (
        <DefaultLayout>
            <Suspense fallback={<div>Loading...</div>}>
            </Suspense>
            {children}
        </DefaultLayout>
    );
}
