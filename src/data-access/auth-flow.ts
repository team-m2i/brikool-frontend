import "server-only";
import { authFlowEndpoints } from "@/config/endpoints/auth-flow-endpoints";
import {
    TConfirmEmailSchema,
    TForgotPasswordSchema, TResetPasswordSchema,
    TSignInSchema,
    TSignUpSchema
} from "@/definitions/schema/auth-flow-schema";
import {
    TConfirmEmailModel,
    TForgotPasswordModel, TJwtModel, TResetPasswordModel,
    TSignInModel,
    TSignInResponseModel,
    TSignUpModel
} from "@/definitions/models/auth-flow-model-schema";
import {
    convertExternalToLocalForgotPasswordResponse,
    convertLocalToExternalConfirmEmailModel,
    convertLocalToExternalForgotPasswordModel, convertLocalToExternalResetPasswordModel,
    convertLocalToExternalSignInModel,
    convertLocalToExternalSignUpModel
} from "@/definitions/transformers/auth-flow-dto";
import { NextResponse } from "next/server";
import {redirect} from "@/i18n/routing";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

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
        console.log("--- target endpoint: ", authFlowEndpoints.config.forgotPassword());
        const data: TForgotPasswordModel | null = convertLocalToExternalForgotPasswordModel(postData);
        const res = await fetch(authFlowEndpoints.config.forgotPassword(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const resData = await res.json();
            const resp = convertExternalToLocalForgotPasswordResponse(resData);
            if (resp) {
                return new NextResponse(JSON.stringify({ requestUid: resp.requestUid }), {
                    status: res.status,
                    statusText: res.statusText
                });
            }
        } else {
            console.error("Error during forgot password");
        }

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
};

export const confirmEmail = async(postData: TConfirmEmailSchema) => {
    try{
        const data: TConfirmEmailModel | null = convertLocalToExternalConfirmEmailModel(postData)
        const endpoint = postData.origin === "forgot-password"
            ? authFlowEndpoints.config.confirmEmail.reset()
            : postData.origin === "sign-up"
                ? authFlowEndpoints.config.confirmEmail.activate()
                : ""
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!res.ok)
            console.error("Error during confirm email")
        console.log("___________ ENDPOINT: ", endpoint)
        console.log(data)
        console.log(res)
        return new NextResponse(null, {
            status: res.status,
            statusText: res.statusText
        });

    }catch(e) {
        console.error("Error during confirm email:", e);
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        });
    }
}
export const resetPassword = async(postData: TResetPasswordSchema) => {
    try {
        const data : TResetPasswordModel | null  = convertLocalToExternalResetPasswordModel(postData)
        const res = await fetch(authFlowEndpoints.config.resetPassword(), {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(!res.ok)
            console.error("Error during reset password")
        return new NextResponse(null, {
            status: res.status,
            statusText: res.statusText
        })
    }catch(err) {
        console.error("Error during reset password: " , err)
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        });
    }
}

export const refreshToken = async (refreshToken: string) => {
    const postData = { refresh_token: refreshToken };
    try {
        const res = await fetch(authFlowEndpoints.jwt.refreshToken(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });
        if (res.ok) {
            return await res.json() as TSignInResponseModel;
        } else {
            console.error("Error refreshing token:", res.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
}