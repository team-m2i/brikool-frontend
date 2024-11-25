import {TNewFreelancer} from "@/definitions/schema/new-freelancer-schema";
import {TNewFreelancerModel} from "@/definitions/models/new-user-model-schema";

export const convertInternalToExternalNewFreelancer = (newFreelancer: TNewFreelancer): TNewFreelancerModel => {
    return {
        userId: newFreelancer.userId,
        nickName: newFreelancer.nickname,
        publicEmail: newFreelancer.publicEmail,
        description: newFreelancer.description,
        phoneNumber: newFreelancer.phone,
        region: newFreelancer.region,
        city: newFreelancer.city,
        zip: newFreelancer.zip,
        address: newFreelancer.address,
        categories: newFreelancer.categories.map(category => +category.id)
    }
}