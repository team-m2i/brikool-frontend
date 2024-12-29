import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";
export const transformFreelancerApiResponse = (apiResponse: any): TFreelancerModel => {
    return {
        id: apiResponse.id || 0, // Default to 0 if missing
        nickName: apiResponse.nickName || "Unknown", // Default to "Unknown"
        description: apiResponse.description || "", // Default to an empty string
        phoneNumber: apiResponse.phoneNumber && /^\+?[0-9. ()-]{7,25}$/.test(apiResponse.phoneNumber)
            ? apiResponse.phoneNumber // Use valid phone number
            : "N/A", // Default to "N/A" for invalid or null numbers
        region: apiResponse.region || "Unknown", // Default to "Unknown"
        city: apiResponse.city || "Unknown", // Default to "Unknown"
        zip: apiResponse.zip || "00000", // Default to "00000"
        address: apiResponse.address || "No Address Provided", // Default to "No Address Provided"
        publicEmail: apiResponse.publicEmail || "unknown@example.com", // Default to a generic email
    };
};

export const transformFreelancerToApiRequest = (freelancer: TFreelancerModel): any => {
    return {
        id: freelancer.id, // Maps frontend "id" to backend "id"
        nickName: freelancer.nickName,
        description: freelancer.description,
        phoneNumber: freelancer.phoneNumber,
        region: freelancer.region,
        city: freelancer.city,
        zip: freelancer.zip,
        address: freelancer.address,
        publicEmail: freelancer.publicEmail,

    };
};
