import {z} from 'zod'
import {calculatePasswordStrength} from "@/lib/utils";

const signUpSchema = z.object({
    email: z.string().email({
        message: "invalid"
    }),
    password: z.string().min(8, {
        message: "invalid",
    }),
    confirmPassword: z.string().min(8, {
        message: "invalid"
    }),
    name: z.string().min(3, {
        message: "invalid",
    }),
    accountType: z.enum(["Freelancer", "Client"], {
        message: "invalid"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "notMatch",
    path: ["confirmPassword"]
}).refine(data => calculatePasswordStrength(data.password) >= 80, {
    message: "weak",
    path: ["password"]
});

const signInSchema = z.object({
    email: z.string().email({
        message: "invalid"
    }),
    password: z.string().min(8, {
        message: "invalid"
    })
})

const signInRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const forgotPasswordSchema = z.object({
    email: z.string().email()
})

const resetPasswordSchema = z.object({
    requestUid: z.string().uuid(),
    password: z.string().min(8, {
        message: "invalid",
    }),
    confirmPassword: z.string().min(8, {
        message: "invalid"
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "notMatch",
    path: ["confirmPassword"]
}).refine(data => calculatePasswordStrength(data.password) >= 80, {
    message: "weak",
    path: ["password"]
});

const confirmEmailSchema = z.object({
    token: z.string({
        message: "required"
    }).length(6, {
        message: "invalid"
    }),
    requestUid: z.string().uuid(),
    origin: z.enum(["forgot-password", "sign-up"])
})
const forgotPasswordResponseSchema = z.object({
    requestUid: z.string().uuid()
})

type TSignUpSchema = z.infer<typeof signUpSchema>
type TSignInSchema = z.infer<typeof signInSchema>
type TSignInRequestSchema = z.infer<typeof signInRequestSchema>
type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>
type TConfirmEmailSchema = z.infer<typeof confirmEmailSchema>
type TForgotPasswordResponseSchema = z.infer<typeof forgotPasswordResponseSchema>

export {
    signUpSchema,
    signInSchema,
    signInRequestSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    confirmEmailSchema,
    forgotPasswordResponseSchema,
    type TSignUpSchema,
    type TSignInSchema,
    type TSignInRequestSchema,
    type TForgotPasswordSchema,
    type TResetPasswordSchema,
    type TConfirmEmailSchema,
    type TForgotPasswordResponseSchema,
}