"use client";
import { Dropdown } from "@/components/Dropdown";
import { TwoOptionsToggle } from "@/components/TwoOptionsToggle";
import { TagsInput } from "@/features/private/Create/components/CreateContent/components/TagsInput/TagsInput";
import { PostMinCreationDate } from "@/types/PostSearching/PostMinCreationDate";
import { PostSortingOptions } from "@/types/PostSearching/PostSortingOptions";
import { PostSortingOrder } from "@/types/PostSearching/PostSortingOrder";
import { SearchPostQueryParams } from "@/types/PostSearching/SearchPostQueryParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./SearchFilters.module.css";

type SortOrder = "asc" | "desc";

export const SearchFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sortBy =
    searchParams.get(SearchPostQueryParams.SORT_BY) ??
    PostSortingOptions.CREATION_DATE;
  const minCreationDate =
    searchParams.get(SearchPostQueryParams.MIN_CREATION_DATE) ??
    PostMinCreationDate.LIFETIME;
  const [tags, setTags] = useState(() =>
    searchParams.getAll(SearchPostQueryParams.TAGS),
  );
  const sortOrder: SortOrder =
    searchParams.get(SearchPostQueryParams.SORT_ORDER) ===
    PostSortingOrder.ASCENDANT
      ? PostSortingOrder.ASCENDANT
      : PostSortingOrder.DESCENDANT;

  const updateSearchParams = (key: SearchPostQueryParams, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortingChange = (option: string) => {
    updateSearchParams(SearchPostQueryParams.SORT_BY, option);
  };

  const handleSortOrderChange = (order: SortOrder) => {
    updateSearchParams(SearchPostQueryParams.SORT_ORDER, order);
  };

  const handleMinCreationDateChange = (date: string) => {
    updateSearchParams(SearchPostQueryParams.MIN_CREATION_DATE, date);
  };

  const handleTagsChange = (nextTags: string[]) => {
    setTags(nextTags);

    const params = new URLSearchParams(searchParams);
    params.delete(SearchPostQueryParams.TAGS);
    nextTags.forEach((tag) => params.append(SearchPostQueryParams.TAGS, tag));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.sortingContainer}>
        <div className={styles.filtersText}>Sort by</div>
        <Dropdown
          options={[
            { label: "Creation date", value: PostSortingOptions.CREATION_DATE },
            { label: "Alphabetical order", value: PostSortingOptions.TITLE },
            { label: "Most liked", value: PostSortingOptions.FAVOURITES_COUNT },
            {
              label: "Most commented",
              value: PostSortingOptions.COMMENTS_COUNT,
            },
            {
              label: "Most proposals made",
              value: PostSortingOptions.PROPOSALS_COUNT,
            },
          ]}
          value={sortBy}
          onChange={handleSortingChange}
        />
        <TwoOptionsToggle
          firstOption={{
            label: "Ascendant",
            value: PostSortingOrder.ASCENDANT,
          }}
          secondOption={{
            label: "Descendant",
            value: PostSortingOrder.DESCENDANT,
          }}
          value={sortOrder}
          onChange={handleSortOrderChange}
          ariaLabel={`Current order ${sortOrder}. Click to toggle order.`}
        />
        <Dropdown
          options={[
            { label: "Lifetime", value: PostMinCreationDate.LIFETIME },
            { label: "Last two days", value: PostMinCreationDate.LAST_2_DAYS },
            { label: "Last week", value: PostMinCreationDate.LAST_WEEK },
            { label: "Last month", value: PostMinCreationDate.LAST_MONTH },
            {
              label: "Last 3 months",
              value: PostMinCreationDate.LAST_3_MONTHS,
            },
            {
              label: "Last year",
              value: PostMinCreationDate.LAST_YEAR,
            },
          ]}
          value={minCreationDate}
          onChange={handleMinCreationDateChange}
        />
      </div>
      <div className={styles.tagsContainer}>
        <TagsInput
          value={tags}
          onChange={handleTagsChange}
          addButtonLabel="Add tag filter"
        />
      </div>
    </div>
  );
};
