"use server";

import { signIn } from "@/lib/auth";
import {
    forgotPasswordSchema,
    signInSchema,
    signUpSchema,
    TForgotPasswordSchema, TSignUpSchema
} from "@/definitions/schema/auth-flow-schema";
import {forgotPassword, signUp} from "@/data-access/auth-flow";
import {BACKEND_SERVER_NAME} from "@/lib/constants";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

export const handleSignUpAction = async (data: TSignUpSchema): Promise<TAuthActionState> => {
    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    }
    const result = signUpSchema.safeParse(data);

    if (result.success) {

        // TODO: Reactivate after backend integrate Email check endpoint
        /*
        const isEmailAlreadyUsed: boolean = await checkUserExists(result.data.email)
        if (isEmailAlreadyUsed)
            return { ...returnState, message:"Email already in use"}
        */
        const res = await signUp(result.data)
        console.log(res.status)
        switch(res.status) {
            case 201:

                // User created
                returnState.status ="success"
                returnState.message = "201"
                break
            case 409:

                // Already exists
                returnState.message = "409"
                break
            case 400:

                // invalid user OBJ
                returnState.message = "400"
                break
            default:

                // Server error
                returnState.message = "500"
        }
    }else {
        returnState.message = "400"
    }

    // TODO: (Optional) Add Error logging
    return returnState
};

export const handleSignInAction = async (formData: FormData): Promise<TAuthActionState> => {
    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    };

    const result = signInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });
    console.log(result.data)
    if (result.success) {
        await signIn(BACKEND_SERVER_NAME, result.data,{redirectTo: authFlowNavLinks.profile.href});
        return {
            status: "success",
            message: "Login succeeded"
        };
    }

    return {
        status: "error",
        message: "Login failed"
    };
};

export const handleForgotPasswordAction = async (data: TForgotPasswordSchema) => {
    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    }
    const parsedData  = forgotPasswordSchema.safeParse(data)
    console.log("called for: " + parsedData)
    if(parsedData.success){
        const forgotPasswordData: TForgotPasswordSchema = {
            email: parsedData.data.email
        }
        const res = await forgotPassword(forgotPasswordData)
        switch(res.status){
            case 200:
                returnState.status = "success"
                returnState.message = "200"
                break
            case 400:
                returnState.message = "400"
                break
            case 404:
                returnState.message = "404"
                break
            default:
                returnState.message = "500"
        }
        return returnState
    }
    else {
        returnState.message = "400"
        return returnState
    }
}

export type TAuthActionState = {
    status: "success" | "error";
    message: string;
};