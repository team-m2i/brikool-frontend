import { BASE_URL } from "@/lib/constants";

export const freelancerEndpoints = {
    item: {
        byId: (id: string) => ({
            get: () => `${BASE_URL}/freelancer/get/${id}`,
            delete: () => `${BASE_URL}/freelancer/delete/${id}`,
            post: () => `${BASE_URL}/freelancer/add/${id}`,
        }),
        byUsername: (username: string) => ({
            get: () => `${BASE_URL}/freelancer/get/username/${username}`,
        }),
    },
    create: {
        modify: (id: string) => `${BASE_URL}/freelancer/Modify`,
    },
};
