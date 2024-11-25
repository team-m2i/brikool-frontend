import {BASE_URL} from "@/lib/constants";

const base_path = `${BASE_URL}/users`

type UserEndpoints = {
    collection: {
        get: (query?: string) => string;
        post: () => string;
    };
    item: (id: string) => {
        get: () => string;
        getPartial: () => string;
        delete: () => string;
        put: () => string;
    };
};

export const usersEndpoints: UserEndpoints = {
    collection: {
        get: (query = '') => `${base_path}?${query}`, // support pagination, filtering, sorting
        post: () => `${base_path}`,
    },
    item: (id: string) => ({
        get: () => `${base_path}/${id}`,
        getPartial: () => `${base_path}/${id}/partial`,
        delete: () => `${base_path}/${id}`,
        put: () => `${base_path}/${id}`,
    }),
};