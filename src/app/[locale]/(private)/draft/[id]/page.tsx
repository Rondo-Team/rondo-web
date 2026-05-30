import { Draft } from "@/features/private/draft";

export default async function DraftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Draft id={id} />;
}
