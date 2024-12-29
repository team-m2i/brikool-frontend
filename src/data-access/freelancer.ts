import { withAuth } from "@/lib/withAuth";
import { freelancerEndpoints } from "@/config/endpoints/freelancer-endpoints";
import { TFreelancerModel } from "@/definitions/models/freelancer-model-schema";
import {
    transformFreelancerApiResponse,
    transformFreelancerToApiRequest
} from "@/definitions/transformers/freelancer-dto";
import { freelancerSchema } from "@/definitions/schema/freelancer-schema";
import {NextResponse} from "next/server";

// Fetch a freelancer by ID
export const fetchFreelancerById = async (id: number): Promise<TFreelancerModel> => {

    try {

        const url = freelancerEndpoints.item.byId(id.toString()).get();
        const res = await withAuth(url, { method: "GET" });

        if (!res.ok) {
            throw new Error(`Error fetching freelancer with ID ${id}: ${res.statusText}`);
        }

        const data = await res.json();

        // Transform and ensure valid defaults
        const transformedData = transformFreelancerApiResponse(data);
        freelancerSchema.parse(transformedData); // Validate against the schema

        return transformedData;
    } catch (error) {
        console.error("Failed to fetch freelancer by ID:", error);
        throw error;
    }
};

// Fetch a freelancer by username
export const fetchFreelancerByUsername = async (username: string): Promise<TFreelancerModel> => {
    try {
        const url = freelancerEndpoints.item.byUsername(username).get();
        const res = await withAuth(url, { method: "GET" });

        if (!res.ok) {
            throw new Error(`Error fetching freelancer with username "${username}": ${res.statusText}`);
        }

        const data = await res.json();

        // Transform and validate the data
        const transformedData = transformFreelancerApiResponse(data);
        freelancerSchema.parse(transformedData); // Validate against the schema

        return transformedData;
    } catch (error) {
        console.error("Failed to fetch freelancer by username:", error);
        throw error;
    }
};

// Delete a freelancer by ID
export const deleteFreelancer = async (id: number): Promise<{ message: string }> => {
    try {
        const url = freelancerEndpoints.item.byId(id.toString()).delete();
        const res = await withAuth(url, { method: "DELETE" });

        if (!res.ok) {
            throw new Error(`Error deleting freelancer with ID ${id}: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to delete freelancer:", error);
        throw error;
    }
};

// Update an existing freelancer
export const updateFreelancer = async (id: number, freelancerData: TFreelancerModel) => {
    if (!id || !freelancerData) {
        return { status: 400, data: { message: "Invalid parameters" } };
    }

    try {
        const response = await withAuth(freelancerEndpoints.create.modify(id.toString()), {
            method: "POST", // Use PUT or PATCH if your API supports it
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(freelancerData),
        });

        const data = await response.json();

        if (!response.ok) {
            return { status: response.status, data: data || { message: "An error occurred" } };
        }

        return { status: response.status, data };
    } catch (error: any) {
        console.error("Error in updateFreelancer:", error);
        return { status: 500, data: { message: error.message || "Internal server error" } };
    }
};


