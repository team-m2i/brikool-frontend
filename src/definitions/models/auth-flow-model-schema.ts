import {z} from "zod"

export const signInUserModelSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    image: z.string(),
    newUser: z.boolean(),
})

export const signUpModelSchema = z.object(
    {
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
        accountType: z.enum(["Freelancer", "Client"])
    }
)
export const jwtModelSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string()
})


export const signInResponseModelSchema = {
    user: signInUserModelSchema,
    jwt: jwtModelSchema
}

export const signInModelSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const forgotPasswordModelSchema = z.object({
    email: z.string().email()
})

export type TSignInModel = z.infer<typeof signInModelSchema>;
export type TJwtModel = z.infer<typeof jwtModelSchema>;
export type TSignUpModel = z.infer<typeof signUpModelSchema>;
export type TSignInUserModel = z.infer<typeof signInUserModelSchema>;
export type TSignInResponseModel = {
    user: TSignInUserModel,
    jwt: TJwtModel
}
export type TForgotPasswordModel = z.infer<typeof forgotPasswordModelSchema>;