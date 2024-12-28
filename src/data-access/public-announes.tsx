import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const getAnnounces = async (searchParams: SearchParamsT): Promise<Anounce[]> => {
    // Filtrer les paramètres pour exclure les valeurs undefined
    const queryParams = new URLSearchParams(
        Object.entries({
            term: searchParams.term || "",
            page: searchParams.page?.toString() || "1", // Par défaut, la page est 1
            sort: searchParams.sort || "ASC", // Par défaut, tri croissant
        }).filter(([_, value]) => value !== undefined) // Supprime les entrées avec undefined
    ).toString();

    const response = await fetch(`/api/announces?${queryParams}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération des annonces");
    }
    const data = await response.json();
    return data as Anounce[];
};

export const getAnnounceById = async (id: number): Promise<Anounce> => {
    const response = await fetch(`/api/announces/${id}`);
    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de l'annonce");
    }
    const data = await response.json();
    return data as Anounce;
};

