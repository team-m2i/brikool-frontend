"use server";

import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";
import { freelancerSchema } from "@/definitions/schema/freelancer-schema";
import { updateFreelancer } from "@/data-access/freelancer";

export const handleUpdateFreelancerActions = async (formData: FormData) => {
    const returnState = {
        status: "error",
        message: "",

    };

    try {
        // Parse form data into an object
        const formObject: TFreelancerModel = {
            id: parseInt(formData.get("id") as string, 10),
            nickName: formData.get("nickName") as string,
            publicEmail: formData.get("publicEmail") as string || undefined,
            description: formData.get("description") as string || undefined,
            phoneNumber: formData.get("phoneNumber") as string,
            region: formData.get("region") as string,
            city: formData.get("city") as string,
            zip: formData.get("zip") as string,
            address: formData.get("address") as string,
        };

        // Validate the parsed object against the schema
        const freelancer = freelancerSchema.safeParse(formObject);

        if (freelancer.success) {
            // Call the backend to update the freelancer
            const res = await updateFreelancer(
                freelancer.data.id,
                freelancer.data
            );

            // Handle response status
            switch (res?.status) {
                case 200:
                    returnState.status = "success";
                    returnState.message = "Freelancer updated successfully.";
                    break;
                default:
                    returnState.status = "error";
                {
                 //   returnState.message = res?.data?.message || "Failed to update freelancer.";
                }
                returnState.message = "Freelancer updated successfully.";

            }
        } else {
            // Validation failed
            returnState.message = "Validation failed: Invalid input data.";
        }
    } catch (error: any) {
        console.error("Error updating freelancer:", error);
        returnState.message = error.message || "An unexpected error occurred.";
    }

    return returnState;
};
