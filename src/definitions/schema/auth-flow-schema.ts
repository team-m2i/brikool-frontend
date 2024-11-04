import {z} from 'zod'
import {calculatePasswordStrength} from "@/lib/utils";

const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password is too short",
    }),
    confirmPassword: z.string().min(6),
    name: z.string().min(3, {
        message: "Name is too short",
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
}).refine(data => calculatePasswordStrength(data.password) >= 80, {
    message: "Password is weak",
    path: ["password"]
});

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

type TSignUpSchema = z.infer<typeof signUpSchema>
type TSignInSchema = z.infer<typeof signInSchema>

export {signUpSchema, signInSchema, type TSignUpSchema, type TSignInSchema}