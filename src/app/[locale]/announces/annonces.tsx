import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AnnounceCard from "./annonceCard";
import PaginationFooter from "./PaginationFooter";
import { getAnnounces } from "@/data-access/public-announes";

const Announces = () => {
    const searchParams = useSearchParams();
    const term = searchParams.get("term");
    const page = searchParams.get("page") || "1";
    const sort = (searchParams.get("sort") as "ASC" | "DESC") || "ASC";
    const [announces, setAnnounces] = useState<Anounce[]>([]);
  
    useEffect(() => {
      const fetchAnnounces = async () => {
        const searchParams: SearchParamsT = {
          term: term || "",
          page: parseInt(page),
          sort,
        };
        const anns = await getAnnounces(searchParams);
        setAnnounces(anns);
      };
  
      fetchAnnounces();
    }, [term, page, sort]);
  
    return (
      <section>
        <div>
          {announces.map((announce, idx) => (
            <AnnounceCard key={idx} announce={announce} />  
          ))}
        </div>
        <PaginationFooter currentPage={parseInt(page)} totalPages={5} />
      </section>
    );
  };
  export default Announces;
