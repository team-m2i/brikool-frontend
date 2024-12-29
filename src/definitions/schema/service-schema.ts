import { z } from "zod";

export const serviceSchema = z.object({
    id: z.number().optional(), // Optional ID for updates
    titre: z
        .string()
        .min(1, "Title is required")
        .regex(/^[a-zA-Z0-9 ]+$/, "Title must contain only letters and numbers"),
    description: z
        .string()
        .min(1, "Description is required")
        .regex(/^[a-zA-Z0-9 ]+$/, "Description must contain only letters and numbers"),
    prix: z
        .number()
        .nonnegative("Price must be positive or zero"),
    pathImage: z.string().min(1, "Image path is required"),
    freelancerId: z.number().int("Freelancer ID must be an integer"),
    categorie: z.number().int("Category ID must be an integer"),
});
