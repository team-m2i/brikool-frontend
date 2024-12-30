import "server-only"
import {withAuth} from "@/lib/withAuth";
import {announceEndpoints} from "@/config/endpoints/announce-endpoints";
import {NextResponse} from "next/server";
import {TServiceModel} from "@/definitions/models/service-model-schema";
import {TAnnounce} from "@/lib/types";
import {getFreelancerPublicProfile} from "@/data-access/public-profiles";
import {getCategoryById} from "@/data-access/category";


export const getAllAnnounces = async () => {
    // Fetch all announces from db
    try {
        const res = await withAuth(announceEndpoints.collection.get())
        if(!res.ok) {
            console.error("Error during fetching announces")
            throw new Error("Error during fetching announces")
        }
        const data = await res.json()
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText,
        })
    }catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
}

export const getAnnounceById = async (id: number) => {
    // Fetch announce by id from db
    try {
        const res = await withAuth(announceEndpoints.item(id).get())
        if(!res.ok) {
            console.error("Error during fetching announce by id")
            throw new Error("Error during fetching announce by id")
        }
        const data = await res.json()
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText
        })
    }catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
}

export const getComplexAnnounces = async () => {
    try {
        const res = await getAllAnnounces()
        if(res.status !== 200) {
            console.error("Error during fetching complex announces")
            throw new Error("Error during fetching complex announces")
        }
        const announces = await res.json() as TServiceModel[]
        if(announces.length >0) {
            const complexAnnounces: TAnnounce[] = []
            for (const announce of announces) {

                const tmp = await generateComplexAnnounce(announce)
                complexAnnounces.push(tmp)
            }
            return new NextResponse(JSON.stringify(complexAnnounces), {
                status: res.status,
                statusText: res.statusText
            })
        }

    }catch (err) {
        console.log(err)
    }
    return new NextResponse(null, {
        status: 500,
        statusText: "Internal server error"
    })
}

export const getComplexAnnounceById = async (id: number) => {
    try {
        const res = await getAnnounceById(id)
        if(!res.ok) {
            console.error("Error during fetching complex announce by id")
            throw new Error("Error during fetching complex announce by id")
        }
        const announce = await res.json() as TServiceModel
        const complexAnnounce = await generateComplexAnnounce(announce)
        return new NextResponse(JSON.stringify(complexAnnounce), {
            status: res.status,
            statusText: res.statusText
        })
    }catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
}

export const generateComplexAnnounce = async (announce : TServiceModel) => {
    // get freelancer public profile
    const freelancerRes = await getFreelancerPublicProfile(announce.freelancerId)
    if(freelancerRes.status !== 200) {
        console.error("Error during fetching freelancer public profile")
        throw new Error("Error during fetching freelancer public profile")
    }
    const freelancer = await freelancerRes.json()

    // get category by id
    const categoryRes = await getCategoryById(announce.categorie)
    if(categoryRes.status !== 200) {
        console.error("Error during fetching category by id")
        throw new Error("Error during fetching category by id")
    }
    const category = await categoryRes.json()
    const complexAnnounce: TAnnounce = {
        id: announce?.id || 0,
        titre: announce.titre,
        description: announce.description,
        pathImage: announce.pathImage,
        prix: announce.prix,
        category: {
            id: category.id,
            titreAr: category.titreAr,
            titreFr: category.titreFr,
            titreEn: category.titreEn
        },
        freelancer: {
            id: freelancer.id,
            nickname: freelancer.nickName,
            publicEmail: freelancer.publicEmail,
            image: freelancer.image
        }
    }
    return complexAnnounce
}
