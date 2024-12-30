"use client"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {useCustomRequestParams} from "@/hooks/use-custom-request-param";

export function AnnouncesPagination({className, currentPage, totalPages}: {className?: string, currentPage: number, totalPages: number}) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
    const handlePagination = useCustomRequestParams('page');
    return (
        <Pagination className={className}>
            <PaginationContent>
                { currentPage > 1 && <PaginationPrevious onClick={() => handlePagination(currentPage - 1)}>Previous</PaginationPrevious>}
                {
                    pages?.map((page, idx) => (
                        <PaginationItem key={idx}>
                            <PaginationLink onClick={() => handlePagination(page)} isActive={currentPage === page}>{page}</PaginationLink>
                        </PaginationItem>
                    ))
                }
                { currentPage < totalPages && <PaginationNext onClick={() => handlePagination(currentPage + 1)}>Next</PaginationNext>}
            </PaginationContent>
        </Pagination>

    )
}
