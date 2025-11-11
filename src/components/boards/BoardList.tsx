"use client";

import { useEffect, useState } from "react";
import type { BoardsPageResponse } from "@/types/board";

export default function BoardList() {
  const [boardsData, setBoardsData] = useState<BoardsPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div>
      <p>게시판 리스트</p>
    </div>
  );
}
