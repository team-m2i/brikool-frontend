import {BASE_URL} from "@/lib/constants"

const base_path = `${BASE_URL}/client/categories`

type CategoryEndpoints = {
    collection:{
        get: (query?: string) => string;
        post: () => string;
    },
    item: (id: number) => {
        get: () => string;
        put: () => string;
        delete: () => string;
    }
}

export const categoryEndpoints: CategoryEndpoints = {
    collection: {
        get: (query = '') => `${base_path}?${query}`,
        post: () => `${base_path}`
    },
    item: (id: number) => ({
        get: () => `${base_path}/${id}`,
        put: () => `${base_path}/${id}`,
        delete: () => `${base_path}/${id}`
    })
}