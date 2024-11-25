import {TNewFreelancer} from "@/definitions/schema/new-freelancer-schema";
import {convertInternalToExternalNewFreelancer} from "@/definitions/transformers/new-user";
import {newUserEndpoints} from "@/config/endpoints/new-user-endpoints";
import {NextResponse} from "next/server";
import {withAuth} from "@/lib/withAuth";

export const configureNewFreeUser = async (newFreelancer: TNewFreelancer) => {
    const data = convertInternalToExternalNewFreelancer(newFreelancer)
    if(data) {
        try {
            console.log("-------------------------------------")
            console.log(data)
            const res = await withAuth(newUserEndpoints.newFreelancer.post(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!res.ok)
                console.error("Error during new freelancer profile configuration")

            return new NextResponse(null, {
                status: res.status,
                statusText: res.statusText
            })

        } catch (error) {
            console.error("Server error: Error during new freelancer profile configuration", error);
            return new NextResponse(null, {
                status: 500,
                statusText: "Something went wrong, Internal server error"
            });
        }
    }
}