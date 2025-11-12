import BoardDetailPage from "@/components/boards/BoardDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <BoardDetailPage boardId={parseInt(id)} />;
}
