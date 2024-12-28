import {
    TConfirmEmailSchema, TForgotPasswordResponseSchema,
    TForgotPasswordSchema, TResetPasswordSchema,
    TSignInSchema,
    TSignUpSchema
} from "@/definitions/schema/auth-flow-schema";
import {
    confirmEmailModelSchema,
    forgotPasswordModelSchema, forgotPasswordResponseModelSchema, resetPasswordModelSchema,
    signInModelSchema,
    signUpModelSchema, TConfirmEmailModel, TForgotPasswordModel, TForgotPasswordResponseModel, TResetPasswordModel,
    TSignInModel,
    TSignUpModel
} from "@/definitions/models/auth-flow-model-schema";


export const convertLocalToExternalSignUpModel = (data: TSignUpSchema): TSignUpModel | null=> {
    const signUpData: TSignUpModel = {
        name: data.name,
        email: data.email,
        password: data.password,
        accountType: data.accountType
    }
    return signUpModelSchema.safeParse(signUpData).data ? signUpData : null;
}

export const convertLocalToExternalSignInModel = (data: TSignInSchema): TSignInModel | null=> {
    const signInData: TSignInModel = {
        email: data.email,
        password: data.password
    }

    return signInModelSchema.safeParse(signInData) ? signInData : null
}

export const convertLocalToExternalForgotPasswordModel = (data: TForgotPasswordSchema): TForgotPasswordModel | null=> {
    const forgotData: TForgotPasswordModel = {
        email: data.email
    }
    return forgotPasswordModelSchema.safeParse(forgotData) ? forgotData : null
}

export const convertLocalToExternalConfirmEmailModel = (data: TConfirmEmailSchema) => {
    const confirmData: TConfirmEmailModel = {
        token: data.token,
        uid: data.requestUid
    }
    return confirmEmailModelSchema.safeParse(confirmData) ? confirmData : null
}

export const convertLocalToExternalResetPasswordModel = (data: TResetPasswordSchema) => {
    const resetData : TResetPasswordModel = {
        uid: data.requestUid,
        newPassword: data.password,
    }

    return resetPasswordModelSchema.safeParse(resetData) ? resetData : null
}

export const convertExternalToLocalForgotPasswordResponse = (data: TForgotPasswordResponseModel) => {
    const respData: TForgotPasswordResponseSchema = {
        requestUid: data.uid
    }

    return forgotPasswordResponseModelSchema.safeParse(respData) ? respData : null
}