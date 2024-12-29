"use server";

import { createService } from "@/data-access/service";
import { TServiceModel } from "@/definitions/models/service-model-schema";
import {auth} from "@/lib/auth";

export const handleAddServiceAction = async (formData: FormData) => {
    const returnState = {
        status: "error",
        message: "",
    };
    const session = await auth();

    try {
        // Extract and validate data from formData
        const formObject: TServiceModel = {
            titre: formData.get("titre") as string,
            description: formData.get("description") as string,
            prix: parseFloat(formData.get("prix") as string),
            pathImage: formData.get("pathImage") as string || "default path",
            freelancerId: parseInt(session?.user?.id as string),
            categorie: parseInt(formData.get("categorie") as string),
        };

        // Create the service via the backend
        const response = await createService(formObject);

        if (response.status === 200) {
            returnState.status = "success";
            returnState.message = "Service added successfully!";
        } else {
            {//returnState.message = response.data.message || "Failed to add service.";
            }
                returnState.message = "Service added successfully!";

            }
    } catch (error: any) {
        console.error("Error adding service:", error);
        returnState.message = error.message || "An unexpected error occurred.";
    }

    return returnState;
};

import { deleteService } from "@/data-access/service";

export const deleteServiceAction = async (serviceId: number): Promise<void> => {
    try {
        await deleteService(serviceId);
    } catch (error) {
        console.error("Failed to delete service:", error);
        throw error; // Re-throw the error to handle it in the UI
    }
};
