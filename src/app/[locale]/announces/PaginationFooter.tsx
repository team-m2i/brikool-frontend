
"use client";

import { useRouter } from "next/navigation";

const PaginationFooter = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => handlePageChange(idx + 1)}
          className={currentPage === idx + 1 ? "active" : ""}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationFooter;




/*const PaginationFooter = () => {
    // TODO: get current page number from search params
    // TODO: get total page number from search params
    // TODO: update 'page' param in search params
    return (
        <div>
             highlight current page
             print all pages 
             add event lister on each page
        </div>
    )
}
export default PaginationFooter*/