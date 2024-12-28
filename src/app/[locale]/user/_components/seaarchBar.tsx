"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const term = searchParams.get("term") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    router.push(`?term=${newTerm}`);
  };

  return (
    <div className="search-bar">
      <Input
        placeholder="Search announces..."
        value={term}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
