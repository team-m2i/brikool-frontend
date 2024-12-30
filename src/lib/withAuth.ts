import {auth} from "@/lib/auth";
import {TSignInResponseModel} from "@/definitions/models/auth-flow-model-schema";
import {headers} from "next/headers";

export const withAuth = async (url: string, init?:  RequestInit, isJson = true) =>{

    const session = await auth()
    let accessToken: string = ""

    if(session?.user) {
        const res : TSignInResponseModel = session.user as TSignInResponseModel
        accessToken = res.jwt.access_token
    }
    if(isJson){
        return await fetch(url, {
            ...init,
            headers: {
                "content-type": "application/json",
                Authorization: 'Bearer ' + accessToken,
            }
        })
    }
    return await fetch(url, {
        ...init,
        headers: {
            Authorization: 'Bearer ' + accessToken,
        }
    })
}