"use server"

import {newFreelancerSchema, TNewFreelancer} from "@/definitions/schema/new-freelancer-schema";
import {TAuthActionState} from "@/actions/common/auth-flow-actions";
import {configureNewFreeUser} from "@/data-access/new-user";
import {auth} from "@/lib/auth";

export const submitNewFreelancerAction = async(newFreelancer: TNewFreelancer) => {

    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    }
    const session = await auth()
    const parseData  = newFreelancerSchema.safeParse(newFreelancer);
    if(session?.user && parseData.success){
        parseData.data.userId = parseInt(session.user?.id as string)
        const res = await configureNewFreeUser(parseData.data)
        switch(res?.status) {
            case 200:
                returnState.status ="success"
                returnState.message = "200"
                break
            default:
                returnState.message = "500"
        }
    }

    return returnState
}