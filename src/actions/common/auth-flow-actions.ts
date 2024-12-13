"use server";

import {auth, signIn, signOut} from "@/lib/auth";
import {
    confirmEmailSchema,
    forgotPasswordSchema, resetPasswordSchema,
    signInSchema,
    signUpSchema, TConfirmEmailSchema, TForgotPasswordResponseSchema,
    TForgotPasswordSchema, TResetPasswordSchema, TSignUpSchema
} from "@/definitions/schema/auth-flow-schema";
import {confirmEmail, forgotPassword, resetPassword, signUp} from "@/data-access/auth-flow";
import {APP_BASE_URL, BACKEND_SERVER_NAME} from "@/lib/constants";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {TSessionUser, TSignInResponseModel} from "@/definitions/models/auth-flow-model-schema";

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
        message: "",
        optional: ""
    }
    const parsedData  = forgotPasswordSchema.safeParse(data)
    // TODO: Request backend to add more return status to solve the ambiguity caused by error state 400
    if(parsedData.success){
        const res = await forgotPassword(parsedData.data)
        switch(res.status){
            case 200:
                returnState.status = "success"
                returnState.message = "200"
                const data = await res.json() as TForgotPasswordResponseSchema
                returnState.optional = data.requestUid
                break
            case 400:
                returnState.message = "404"
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

export const refreshUserSession = async() => {
    const user = (await auth())?.user as TSessionUser;
    console.log("------- --------- ----------- called within refreshToken action: ", user)
    await signIn(BACKEND_SERVER_NAME, {email: "", password: "", refreshToken: user?.jwt?.refresh_token});
}
export type TAuthActionState = {
    status: "success" | "error";
    message: string;
    optional?: string;
};

export const handleConfirmEmail = async (data: TConfirmEmailSchema) => {
    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    }
    const parsedData = confirmEmailSchema.safeParse(data)
    if(parsedData.success) {
        const res  = await confirmEmail(parsedData.data);
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
    }else {
        returnState.message = "400"
        return returnState
    }
}

export const handleResetPassword = async(data: TResetPasswordSchema) => {
    const returnState: TAuthActionState = {
        status: "error",
        message: ""
    }
    const parsedData = resetPasswordSchema.safeParse(data)
    if(parsedData.success){
        const res  = await resetPassword(parsedData.data)
        // TODO: Request backend to add more return status to solve the ambiguity caused by error state 400
        switch(res.status){
            case 200:
                returnState.status = "success"
                returnState.message = "200"
                break
            case 400:
                returnState.message = "400"
                break
            default:
                returnState.message = "500"
        }
        return returnState
    }else {
        returnState.message = "400"
        return returnState
    }
}

export const logout = async(redirectTo?: string) => {
    // the redirectTo url must contain the prefix of locale
    await (redirectTo ? signOut({redirectTo: APP_BASE_URL + redirectTo}) : signOut())
}