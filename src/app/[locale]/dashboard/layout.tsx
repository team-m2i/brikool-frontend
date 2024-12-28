import React, {Suspense, ReactNode} from 'react'
type TRole = 'admin' | 'freelancer'
const ROLE: TRole = 'freelancer'
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Layout({admin, freelancer}: {admin: ReactNode, freelancer: ReactNode}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {ROLE === 'admin' ? admin : freelancer}
        </Suspense>
    );
}