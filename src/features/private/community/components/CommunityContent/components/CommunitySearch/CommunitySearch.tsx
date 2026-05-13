"use client";
import { SearchBar } from "@/components/SearchBar";
import { SearchPostQueryParams } from "@/types/SearchPostQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CommunitySearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set(SearchPostQueryParams.QUERY, term);
    else params.delete(SearchPostQueryParams.QUERY);
    replace(`${pathname}?${params.toString()}`);
  };

  // Faltaria todavia añadir aqui los filtros, y que se vean reflejados en la url.
  return (
    <div>
      <SearchBar placeholder="Search for posts" onChange={handleSearch} />
    </div>
  );
};
