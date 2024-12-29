import { z } from "zod";

export const freelancerSchema = z.object({
    id: z.number().int().positive("Freelancer ID must be a positive integer"),
    nickName: z.string().min(1, "Nickname is required").default("Unknown"),
    description: z.string().optional(),
    phoneNumber: z.string().regex(
        /^\+?[0-9. ()-]{7,25}$/,
        "Phone number must be valid (e.g., +1234567890)"
    ).default("N/A"), // Default to "N/A" if invalid
    region: z.string().min(1, "Region is required").default("Unknown"),
    city: z.string().min(1, "City is required").default("Unknown"),
    zip: z.string().regex(/^\d{5}$/, "ZIP code must be a valid 5-digit number").default("00000"),
    address: z.string().min(1, "Address is required").default("No Address Provided"),
    publicEmail: z.string().email("Public Email must be valid").default("unknown@example.com"),
});
