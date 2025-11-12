"use client";

import type { BoardListItem } from "@/types/board";

interface BoardCardProps {
  board: BoardListItem;
  onClick?: (boardId: number) => void;
}

export default function BoardCard({ board, onClick }: BoardCardProps) {
  return (
    <div
      onClick={() => onClick?.(board.id)}
      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
    >
      {/* 제목 */}
      <h2 className="text-lg font-semibold">{board.title}</h2>

      {/* 카테고리, 작성일 */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <span className="px-2 py-1 bg-gray-200 rounded">{board.category}</span>
        <span>{new Date(board.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
