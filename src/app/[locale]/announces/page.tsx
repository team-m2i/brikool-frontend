import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import {AnnounceCard} from "@/app/[locale]/announces/announce-card";
import {AnnouncesPagination} from "@/app/[locale]/announces/pagination";
import {SearchBar} from "@/app/[locale]/announces/search-bar";
import {Hammer} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {TAnnounce} from "@/lib/types";
import {getComplexAnnounces} from "@/data-access/announce";

interface PageProps {
    searchParams: { [key: string]: string | undefined };
}



const filterByTerm = (term: string, announces: TAnnounce[]) => {
    return announces.filter(announce => announce.titre.toLowerCase().includes(term.toLowerCase()))
}

const sortByPrice = (sortPrice: "ASC" | "DESC", announces: TAnnounce[]) => {
    return announces.sort((a, b) => sortPrice === "ASC" ? a.prix - b.prix : b.prix - a.prix)
}

const sortByDate = (sortDate: "NEWEST" | "ANCIENT", announces: TAnnounce[]) => {
    return announces.sort((a, b) => sortDate === "NEWEST" ? b.id - a.id : a.id - b.id)
}
const sortAlphabets = (sortAlpha: "A-Z" | "Z-A", announces: TAnnounce[]) => {
    return announces.sort((a, b) => sortAlpha === "A-Z" ? a.titre.localeCompare(b.titre) : b.titre.localeCompare(a.titre))
}

const processAnnounces = (announces: TAnnounce[], sortAlpha: "A-Z" | "Z-A" | null, sortPrice: "ASC" | "DESC" | null, sortDate: "NEWEST" | "ANCIENT" | null, currentPage: number, itemsPerPage: number) => {
    // sort by filters
    if(sortPrice) announces = sortByPrice(sortPrice, announces);
    if(sortDate) announces = sortByDate(sortDate, announces);
    if(sortAlpha) announces = sortAlphabets(sortAlpha, announces);

    // add pagination
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return announces.slice(start, end);
}

async function Page({ searchParams }: PageProps) {
    const itemsPerPage = 10;
    const term = searchParams?.term as string
    const sortAlpha = searchParams?.alphabets as "A-Z" | "Z-A"
    const sortPrice = searchParams?.price as "ASC" | "DESC"
    const sortDate = searchParams?.date as "NEWEST" | "ANCIENT"
    const currentPage = (parseInt(searchParams?.page || "1") ) as number
    const allAnnounces = await getAnnounces();
    const filteredAnnounces = term ? filterByTerm(term, allAnnounces) : allAnnounces;
    const renderedAnnounces = processAnnounces(filteredAnnounces, sortAlpha, sortPrice, sortDate, currentPage, itemsPerPage);
    return (
        <div>
            <Navbar className={"relative"} />
            <section className={"min-h-screen px-6 sm:px-10 md:px-16 lg:px-24 xl:px-36 pt-16"}>
                <div className={"flex items-center justify-between flex-wrap gap-4"}>
                    <h1 className={"primary-text text-4xl font-extrabold flex items-center justify-start gap-2"}><Hammer size={36} /> Announces</h1>
                    <SearchBar className={"w-fit"}/>
                </div>
                <Separator orientation="vertical" className={"mt-6 h-0.5 w-full"} />
                <div className={"pt-8 flex items-center justify-center flex-wrap gap-4"}>
                    {renderedAnnounces?.length > 0 ? (
                        renderedAnnounces.map((announce, idx) => (<AnnounceCard announce={announce} key={idx} />))
                    ): (
                        <div> No announces found </div>
                        )}
                </div>
                <AnnouncesPagination currentPage={currentPage} totalPages={Math.ceil(filteredAnnounces.length / itemsPerPage)} className={"pb-8 pt-3"}/>
            </section>
            <Footer/>
        </div>
    );
}


const getAnnounces = async (): Promise<TAnnounce[]> => {
    try {
        const res = await getComplexAnnounces()
        if(!res.ok) {
            console.error("Error during fetching complex announces")
        }
        return await res?.json() as TAnnounce[]
    }catch (err) {
        console.error(err)
        return []
    }
}

export default Page;