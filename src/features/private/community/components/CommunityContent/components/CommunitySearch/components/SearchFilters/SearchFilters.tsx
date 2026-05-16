"use client";
import { Dropdown } from "@/components/Dropdown";
import { TwoOptionsToggle } from "@/components/TwoOptionsToggle";
import { TagsInput } from "@/features/private/Create/components/CreateContent/components/TagsInput/TagsInput";
import { PostMinCreationDate } from "@/types/PostSearching/PostMinCreationDate";
import { PostSortingOptions } from "@/types/PostSearching/PostSortingOptions";
import { PostSortingOrder } from "@/types/PostSearching/PostSortingOrder";
import { SearchPostQueryParams } from "@/types/PostSearching/SearchPostQueryParams";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./SearchFilters.module.css";

type SortOrder = "asc" | "desc";

export const SearchFilters = () => {
  const t = useTranslations("communityPage.sortingOptions");
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
        <div className={styles.filtersText}>{t("sortBy.title")}</div>
        <Dropdown
          options={[
            {
              label: t("sortBy.fieldDropdown.creationDate"),
              value: PostSortingOptions.CREATION_DATE,
            },
            {
              label: t("sortBy.fieldDropdown.alphabeticalOrder"),
              value: PostSortingOptions.TITLE,
            },
            {
              label: t("sortBy.fieldDropdown.mostLiked"),
              value: PostSortingOptions.FAVOURITES_COUNT,
            },
            {
              label: t("sortBy.fieldDropdown.mostCommented"),
              value: PostSortingOptions.COMMENTS_COUNT,
            },
            {
              label: t("sortBy.fieldDropdown.mostProposals"),
              value: PostSortingOptions.PROPOSALS_COUNT,
            },
          ]}
          value={sortBy}
          onChange={handleSortingChange}
        />
        <TwoOptionsToggle
          firstOption={{
            label: t("sortBy.order.ascendant"),
            value: PostSortingOrder.ASCENDANT,
          }}
          secondOption={{
            label: t("sortBy.order.descendant"),
            value: PostSortingOrder.DESCENDANT,
          }}
          value={sortOrder}
          onChange={handleSortOrderChange}
          ariaLabel={`Current order ${sortOrder}. Click to toggle order.`}
        />
        <Dropdown
          options={[
            {
              label: t("sortBy.datesDropdown.lifetime"),
              value: PostMinCreationDate.LIFETIME,
            },
            {
              label: t("sortBy.datesDropdown.lastTwoDays"),
              value: PostMinCreationDate.LAST_2_DAYS,
            },
            {
              label: t("sortBy.datesDropdown.lastWeek"),
              value: PostMinCreationDate.LAST_WEEK,
            },
            {
              label: t("sortBy.datesDropdown.lastMonth"),
              value: PostMinCreationDate.LAST_MONTH,
            },
            {
              label: t("sortBy.datesDropdown.lastThreeMonths"),
              value: PostMinCreationDate.LAST_3_MONTHS,
            },
            {
              label: t("sortBy.datesDropdown.lastYear"),
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
          addButtonLabel={t("filters.addTags")}
        />
      </div>
    </div>
  );
};
