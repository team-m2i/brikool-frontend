
import {fetchFreelancerById} from "@/data-access/freelancer";
import ProfileBox from "@/components/ProfileBox";
import React from "react";


async function Page({params: {freelancerId}}: {params: {freelancerId: string }}) {

    const freelancer = await fetchFreelancerById(+freelancerId);
    return (
        <div className="mx-auto w-full mt-10 max-w-[970px]">
            <ProfileBox freelancer={freelancer} canEditCover={false}/>
        </div>
    );
}

export default Page;