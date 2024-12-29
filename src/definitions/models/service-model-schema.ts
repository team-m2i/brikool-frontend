export interface TServiceModel {
    id?: number; // Service ID (optional for creation)
    titre: string; // Title of the service
    description: string; // Description of the service
    prix: number; // Price of the service (must be positive or zero)
    pathImage: string; // Path to the image
    freelancerId: number; // ID of the associated freelancer
    categorie: number; // ID of the associated category
}
