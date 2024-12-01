import React, {Suspense, ReactNode} from 'react'

type TRole = 'admin' | 'freelancer' | 'client';  // Ajout de "client"
const ROLE: TRole = 'client';  // Exemple de rôle "client"

export default function Layout({admin, freelancer, client}: {admin: ReactNode, freelancer: ReactNode, client: ReactNode}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {ROLE === 'admin' ? admin : ROLE === 'freelancer' ? freelancer : client}
        </Suspense>
    );
}