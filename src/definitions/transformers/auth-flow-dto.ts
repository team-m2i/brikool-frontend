import {
    TForgotPasswordSchema,
    TSignInSchema,
    TSignUpSchema
} from "@/definitions/schema/auth-flow-schema";
import {
    forgotPasswordModelSchema,
    signInModelSchema,
    signUpModelSchema, TForgotPasswordModel,
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
    return forgotPasswordModelSchema.safeParse(data) ? data : null
}