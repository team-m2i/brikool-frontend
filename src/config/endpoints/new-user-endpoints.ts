import {BASE_URL} from "@/lib/constants"

const base_path = `${BASE_URL}/user`

type NewUserEndpoints = {
    newUser: {
        post: () => string;
    },
    newFreelancer: {
        post: () => string;
    }
}

export const newUserEndpoints: NewUserEndpoints = {
    newUser: {
        post: () => `${base_path}/new-user`
    },
    newFreelancer: {
        post: () => `${base_path}/first_login`
    }
}