"use client";
import { Pagination } from "@/components/Pagination";
import { DEFAULT_PAGE } from "@/modules/shared/domain/consts";
import { SearchPostQueryParams } from "@/types/PostSearching/SearchPostQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./CommunityPagination.module.css";

interface CommunityPaginationProps {
  total: number;
}

const parseInitialPage = (page: number, total: number) => {
  if (!Number.isFinite(page)) return DEFAULT_PAGE;
  return Math.min(Math.max(page, 1), total);
};

export const CommunityPagination = ({ total }: CommunityPaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const urlPageParam = searchParams.get(SearchPostQueryParams.PAGE);
  const parsedUrlPage = parseInitialPage(
    Number(urlPageParam ?? DEFAULT_PAGE),
    total,
  );

  const [currentPage, setCurrentPage] = useState(() => {
    return parsedUrlPage;
  });

  useEffect(() => {
    if (!urlPageParam) {
      const params = new URLSearchParams(searchParams);
      params.set(SearchPostQueryParams.PAGE, parsedUrlPage.toString());
      replace(`${pathname}?${params.toString()}`);
      return;
    }

    if (parsedUrlPage.toString() !== urlPageParam) {
      const params = new URLSearchParams(searchParams);
      params.set(SearchPostQueryParams.PAGE, String(parsedUrlPage));
      replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }
  }, [parsedUrlPage, pathname, replace, searchParams, urlPageParam]);

  const pageForUi = urlPageParam ? parsedUrlPage : currentPage;

  const handlePaginationChange = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(nextPage, 1), total);
    const params = new URLSearchParams(searchParams);

    setCurrentPage(clampedPage);
    params.set(SearchPostQueryParams.PAGE, String(clampedPage));
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Pagination
      className={styles.paginationContainer}
      page={pageForUi}
      total={total}
      onChange={handlePaginationChange}
    />
  );
};
