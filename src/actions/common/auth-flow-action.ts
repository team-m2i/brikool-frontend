"use server"

import { signIn } from "@/lib/auth";
import { signInSchema, signUpSchema, } from "@/definitions/schema/auth-flow-schema";
import { z } from 'zod';

const parseFormData = <T>(schema: z.ZodSchema<T>, formData: FormData): T | null => {
    const result = schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        name: formData.get("name"),
    });
    return result.success ? result.data : null;
};

export const handleSignUpAction = async (formData: FormData) => {
    return await handleAuthAction(
        signUpSchema,
        formData,
        {
        success: "Sign up successful",
        error: "Sign up failed"
    });
};

export const handleSignInAction = async (formData: FormData) => {
    return await handleAuthAction(
        signInSchema,
        formData,
        {
        success: "Sign in successful",
        error: "Email or password invalid"
    });
};


export const handleAuthAction = async <T>(schema: z.ZodSchema<T>, formData: FormData, message:{success: string, error: string}): Promise<TAuthActionState> => {
    const authData = parseFormData(schema, formData);
    if (authData) {
        await signIn("springboot", authData);
        return {
            status: "success",
            message: message.success,
        };
    }

    return {
        status: "error",
        message: message.error,
    };
};

export type TAuthActionState = {
    status: "success" | "error",
    message: string,
};