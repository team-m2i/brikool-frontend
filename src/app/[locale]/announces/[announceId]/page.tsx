import React from 'react';

async function Page({params: {announceId}}: {params: { announceId: string }}) {
    return (
        <div>
            announce with id {announceId}
        </div>
    );
}

export default Page;