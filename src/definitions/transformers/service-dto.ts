import { TServiceModel } from "@/definitions/models/service-model-schema";

export const transformServiceApiResponse = (apiResponse: any): TServiceModel => {
    return {
        id: apiResponse.id || 0, // Default to 0 if missing
        titre: apiResponse.titre || "Unknown Title", // Default to a placeholder
        description: apiResponse.description || "No description provided",
        prix: apiResponse.prix || 0, // Default to 0 if missing
        pathImage: apiResponse.pathImage || "no-image.png", // Default to a placeholder
        freelancerId: apiResponse.freelancerId || 0, // Default to 0
        categorie: apiResponse.categorie || 0, // Default to 0
    };
};

export const transformServiceToApiRequest = (service: TServiceModel): any => {
    return {
        id: service.id,
        titre: service.titre,
        description: service.description,
        prix: service.prix,
        pathImage: service.pathImage,
        freelancerId: service.freelancerId,
        categorie: service.categorie,
    };
};
