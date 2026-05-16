"use client";
import { SearchBar } from "@/components/SearchBar";
import { SearchFilters } from "@/features/private/community/components/CommunityContent/components/CommunitySearch/components/SearchFilters";
import { SearchPostQueryParams } from "@/types/PostSearching/SearchPostQueryParams";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import styles from "./CommunitySearch.module.css";

export const CommunitySearch = () => {
  const t = useTranslations("communityPage");
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
    <div className={styles.searchContainer}>
      <SearchBar
        placeholder={t("search.placeholder")}
        onChange={handleSearch}
        defaultValue={
          searchParams.get(SearchPostQueryParams.QUERY?.toString()) ?? ""
        }
      />
      <SearchFilters />
    </div>
  );
};
