import {z} from "zod"

const categoryItemSchema = z.object({
    title: z.string(),
    description: z.string()
})

export const categorySchema = z.object({
    id: z.string(),
    ar: categoryItemSchema,
    fr: categoryItemSchema,
    en: categoryItemSchema
});

export type TCategory = z.infer<typeof categorySchema>

export const newFreelancerSchema = z.object({
    userId: z.number(),
    nickname: z.string().min(3, {message: "invalid"}).max(32, {message: "invalid_max"}),
    publicEmail: z.string().email({message: "invalid"}).or(z.string().max(0)),
    description: z.string().min(3, {message: "invalid"}).max(200, {message: "invalid_max"}),
    phone: z.string().regex(new RegExp("[0-9]{10}"), {message: "invalid"}),
    region: z.string().min(1, {message: "invalid"}).max(64, {message: "invalid_max"}),
    city: z.string().min(3, {message: "invalid"}).max(64, {message: "invalid_max"}),
    zip: z.string().regex(new RegExp("[0-9]+"), {message: "invalid"}),
    address: z.string().min(3, {message: "invalid"}).max(96, {message: "invalid_max"}),
    categories: z.array(categorySchema).max(3, {message: "invalid_max"}).min(1, {message: "invalid"})
})

export type TNewFreelancer = z.infer<typeof newFreelancerSchema>;