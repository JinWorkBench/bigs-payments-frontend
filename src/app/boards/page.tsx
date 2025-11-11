import BoardList from "@/components/boards/BoardList";

export default function BoardsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">게시판</h1>
      <BoardList />
    </div>
  );
}