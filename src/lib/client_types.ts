type Anounce = {
    id : string;
    title: string;
    description:string
}

type SearchParamsT = {
    term?: string;
    page?: number;
    sort?: "ASC" | "DESC";
    totalPages?: number
}