import "server-only"
import {cache} from "react";
import {withAuth} from "@/lib/withAuth";
import {categoryEndpoints} from "@/config/endpoints/category-endpoints";
import {NextResponse} from "next/server";

export const getAllCategories = cache(async () => {
    try {
        const res = await withAuth(categoryEndpoints.collection.get())
        if(!res.ok) {
            console.error("Error during fetching categories")
            throw new Error("Error during fetching categories")
        }
        const data = await res.json()
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText
        })
    } catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
})

export const getCategoryById = async (id: number) => {
    try {
        const res = await withAuth(categoryEndpoints.item(id).get())
        if(!res.ok) {
            console.error("Error during fetching category by id")
            throw new Error("Error during fetching category by id")
        }
        const data = await res.json()
        return new NextResponse(JSON.stringify(data), {
            status: res.status,
            statusText: res.statusText
        })
    } catch (err) {
        return new NextResponse(null, {
            status: 500,
            statusText: "Internal server error"
        })
    }
}