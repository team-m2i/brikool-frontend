import {z} from 'zod';
export const UserModelSchema = z.object({
    userId: z.number(),
    userFirstName: z.string(),
    userLastName: z.string(),
    userEmail: z.string().email(),
})

export type TUserModel = z.infer<typeof UserModelSchema>;
