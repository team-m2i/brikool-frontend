import "server-only";
import { authFlowEndpoints } from "@/config/endpoints/auth-flow-endpoints";
import {TForgotPasswordSchema, TSignInSchema, TSignUpSchema} from "@/definitions/schema/auth-flow-schema";
import {
    TForgotPasswordModel,
    TSignInModel,
    TSignInResponseModel,
    TSignUpModel
} from "@/definitions/models/auth-flow-model-schema";
import {
    convertLocalToExternalForgotPasswordModel,
    convertLocalToExternalSignInModel,
    convertLocalToExternalSignUpModel
} from "@/definitions/transformers/auth-flow-dto";
import { NextResponse } from "next/server";

export const checkUserExists = async (email: string) => {
    const postData = { email: email };
    try {
        const res = await fetch(authFlowEndpoints.authFlow.checkEmail(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
        if (res.ok) {
            return true;
        } else {
            console.error("Error checking user existence:", res.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
};

export const signUp = async (newUser: TSignUpSchema) => {
    const data: TSignUpModel | null = convertLocalToExternalSignUpModel(newUser);
    console.log("------------- log register data -----------------")
    console.log(data)
    if (data) {
        try {
            const res = await fetch(authFlowEndpoints.authFlow.signUp(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            console.log("status:" + res.status)
            if (!res.ok)
                console.error("Error during sign-up")

            return new NextResponse(null, {
                status: res.status,
                statusText: res.statusText
            });

        } catch (error) {
            console.error("Error during sign-up:", error);
            return new NextResponse(null, {
                status: 500,
                statusText: "Internal server error"
            });
        }
    } else {
        return new NextResponse(null, {
            status: 400,
            statusText: "Invalid user data"
        });
    }
};

export const customSignIn = async(signInData: TSignInSchema): Promise<NextResponse<TSignInResponseModel>> => {
    const data: TSignInModel | null = convertLocalToExternalSignInModel(signInData);

    if(data) {
        try {
            const res = await fetch(authFlowEndpoints.authFlow.signIn(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resData = await res.json()
            if (!res.ok)
                console.error("Error during sign-in")
            return new NextResponse(JSON.stringify(resData), {
                status: res.status,
                statusText: res.statusText
            })
        } catch (error) {
            console.error("Error during sign-in:", error);
            return new NextResponse(null, {
                status: 500,
                statusText: "Internal server error"
            });
        }
    }
    return new NextResponse(null, {
        status: 400,
        statusText: "Invalid user data"
    });

}

export const forgotPassword = async (postData: TForgotPasswordSchema) => {
    try {
        const data: TForgotPasswordModel | null = convertLocalToExternalForgotPasswordModel(postData)
        const res = await fetch(authFlowEndpoints.config.forgotPassword(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!res.ok)
            console.error("Error during forgot password")
        return new NextResponse(null, {
            status: res.status,
            statusText: res.statusText
        });
    } catch (error) {
        console.error("Error during forgot password:", error);
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        });
    }
}