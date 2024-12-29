export const serviceEndpoints = {
    base: "/api/freelancer/service",

    // Fetch all services
    list: {
        all: () => `${serviceEndpoints.base}/list`,
        byCategory: (categoryId: string) => `${serviceEndpoints.base}/list/category/${categoryId}`,
    },

    // Fetch a single service
    item: {
        byId: (id: string) => ({
            get: () => `${serviceEndpoints.base}/${id}`,
            delete: () => `${serviceEndpoints.base}/${id}/delete`,
            modify: () => `${serviceEndpoints.base}/${id}/modify`,
        }),
    },

    // Create a new service
    create: {
        add: () => `${serviceEndpoints.base}/create`,
        new() {
            return "";
        },
        modify(s: string) {
            return "";
        }
    },
};
