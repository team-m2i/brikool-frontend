import { withAuth } from "@/lib/withAuth";
import { TServiceModel } from "@/definitions/models/service-model-schema";

// Create a new service
export const createService = async (service: TServiceModel) => {
    try {
        const response = await withAuth("http://localhost:8080/api/freelancer/service/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(service),
        });

        const data = await response.json();

        if (!response.ok) {
            return { status: response.status, data: data || { message: "An error occurred" } };
        }

        return { status: response.status, data };
    } catch (error: any) {
        console.error("Error in createService:", error);
        return { status: 500, data: { message: error.message || "Internal server error" } };
    }
};

// Fetch a service by ID Freelancer
export const fetchServicesByFreelancerId = async (
    freelancerId: number
): Promise<TServiceModel[]> => {
    try {
        // Construct the API endpoint URL
        const url = `http://localhost:8080/api/freelancer/service/ByIdFreelancer/${freelancerId}`;

        // Make the GET request to the server
        const response = await withAuth(url, {
            method: "GET",
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(
                `Error fetching services for freelancer ID ${freelancerId}: ${response.statusText}`
            );
        }

        // Parse the JSON response
        const data = await response.json();

        // Typecast and return the list of services
        return data as TServiceModel[];
    } catch (error) {
        console.error("Failed to fetch services by freelancer ID:", error);
        throw error;
    }
};

// Delete a service by ID
export const deleteService = async (id: number): Promise<{ message: string }> => {
    try {
        const url = `http://localhost:8080/api/freelancer/service/delete/${id}`;
        const res = await withAuth(url, { method: "DELETE" });

        if (!res.ok) {
            throw new Error(`Error deleting service with ID ${id}: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to delete service:", error);
        throw error;
    }
};
