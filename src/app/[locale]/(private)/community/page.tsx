import { Community } from "@/features/private/community";
import { DEFAULT_PAGE } from "@/modules/shared/domain/consts";

export default async function CommunityPage(props: {
  searchParams?: Promise<{
    page?: string;
    sortBy?: string;
    sortOrder?: string;
    query?: string;
    tags?: string[];
    minCreationDate?: string;
    minFavourites?: string;
  }>;
}) {
  const params = await props.searchParams;
  const parsedPage = Number(params?.page);
  const parsedMinFavourites = Number(params?.minFavourites);

  return (
    <Community
      page={Number.isFinite(parsedPage) ? parsedPage : DEFAULT_PAGE}
      sortBy={params?.sortBy}
      sortOrder={params?.sortOrder}
      query={params?.query}
      tags={params?.tags}
      minCreationDate={params?.minCreationDate}
      minFavourites={
        Number.isFinite(parsedMinFavourites) ? parsedMinFavourites : undefined
      }
    />
  );
}
