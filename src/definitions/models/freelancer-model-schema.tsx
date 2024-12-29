export type TFreelancerModel = {
    id: number; // Maps to "id" in backend
    nickName: string;
    publicEmail?: string; // Optional
    description?: string; // Optional
    phoneNumber: string;
    region: string;
    city: string;
    zip: string;
    address: string;

};
