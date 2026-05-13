"use client";
import { SearchBar } from "@/components/SearchBar";
import { SearchPostQueryParams } from "@/types/SearchPostQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const CommunitySearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set(SearchPostQueryParams.QUERY, term);
    else params.delete(SearchPostQueryParams.QUERY);
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Faltaria todavia añadir aqui los filtros, y que se vean reflejados en la url.
  return (
    <div>
      <SearchBar
        placeholder="Search for posts"
        onChange={handleSearch}
        defaultValue={
          searchParams.get(SearchPostQueryParams.QUERY?.toString()) ?? ""
        }
      />
    </div>
  );
};
