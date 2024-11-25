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