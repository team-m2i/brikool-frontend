"use client"
import {ReactNode, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {DollarSign, AArrowUp, SortAsc} from "lucide-react";
import {cn} from "@/lib/utils";
import {useCustomRequestParams, useClearRequestParams} from "@/hooks/use-custom-request-param";
import {useDebounce} from "@/hooks/use-debounce";

export const SearchBar = ({className}: {className: string}) => {
    const handleSearch = useCustomRequestParams("term");
    const [searchTerm, setSearchTerm] = useState<string>("")
    const debouncedSearch = useDebounce(searchTerm);
    useEffect(() => {
        if(debouncedSearch) {
            handleSearch(debouncedSearch)
        }
    }, [debouncedSearch])
    const clearRequestParams = useClearRequestParams();
    return (
        <div className={cn("flex items-center justify-end gap-1", className)}>
            <FilterElement filter={"alphabets"} icon={<AArrowUp size={24} />}  options={["A-Z", "Z-A"]} />
            <FilterElement filter={"price"} icon={<DollarSign size={24} />}  options={["asc", "desc"]} />
            <FilterElement filter={"sort"} icon={<SortAsc size={24} />}  options={["newest", "ancient"]} />
            <Input placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} className={"max-w-80 px-6 py-4"} />
            <Button variant={"default"}>Search</Button>
            <Button variant={"destructive"} onClick={() => clearRequestParams()}>Clear</Button>
        </div>
    )
}


export function FilterElement({filter, icon, options}: {filter: string, icon: ReactNode, options: string[]}) {
    const handleFilter = useCustomRequestParams(filter);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost">{icon} {filter}</Button>
            </PopoverTrigger>
            <PopoverContent className={"w-42 flex items-start justify-center flex-col gap-2"}>
                {options.map((option, idx) => (
                    <Button variant={"ghost"} onClick={() => handleFilter(option)} key={idx} className={"w-full"}>{option}</Button>
                ))}
            </PopoverContent>
        </Popover>
    )
}