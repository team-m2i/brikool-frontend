import {TServiceModel} from "@/definitions/models/service-model-schema";

export type City = {
    id: string,
    "region_id": number,
    "names": {
        "ar": string,
        "en": string,
        "fr": string
    }
}

export type Region = {
    "id": number,
    "names": {
        "ar": string,
        "en": string,
        "fr": string
    }
}
export type UserLvl = "1" | "2"

export type Locale = "en" | "ar" | "fr"

export type TAnnounce = {
    id: number,
    titre: string,
    description: string,
    prix: number,
    pathImage: string,
    category: {
        id: number,
        titreAr: string,
        titreFr: string,
        titreEn: string
    },
    freelancer: {
        id: number,
        nickname: string,
        publicEmail: string,
        image: string
    }
}