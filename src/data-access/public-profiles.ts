import "server-only"
import {withAuth} from "@/lib/withAuth";
import {publicProfileEndpoints} from "@/config/endpoints/public-profile-endpoints";
import {NextResponse} from "next/server";

export const getFreelancerPublicProfile = async (id: number) => {
    try {
        const res = await withAuth(publicProfileEndpoints.item(id).get())
        if(!res.ok) {
            console.error("Error during fetching freelancer public profile")
            throw new Error("Error during fetching freelancer public profile")
        }
        const data = await res.json()
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText
        })
    } catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
}
