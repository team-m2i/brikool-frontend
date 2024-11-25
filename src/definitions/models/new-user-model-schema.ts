import {z} from "zod";
export const newFreelancerModelSchema = z.object({
    userId: z.number(),
    nickName: z.string().min(3, {message: "Nickname must contain at least 3 characters"}).max(32),
    publicEmail: z.string().email(),
    description: z.string().min(3).max(200),
    phoneNumber: z.string().regex(new RegExp("[0-9]{10}")),
    region: z.string().min(3).max(64),
    city: z.string().min(3).max(64),
    zip: z.string().regex(new RegExp("[0-9]+")),
    address: z.string().min(3).max(96),
    categories: z.array(z.number()).max(3).min(1)
})

export type TNewFreelancerModel = z.infer<typeof newFreelancerModelSchema>;