"use client";

import { useCallback, useEffect, useState } from "react";
import { getBoardsAPI } from "@/lib/api/board";
import type { BoardsPageResponse } from "@/types/board";

export default function BoardList() {
  const [boardsData, setBoardsData] = useState<BoardsPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // API 호출
  const fetchBoards = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);

    const response = await getBoardsAPI(page, 10);

    if (response.success && response.data) {
      setBoardsData(response.data);
      setCurrentPage(page);
    } else {
      setError(response.error || "게시글 조회 실패");
    }

    setIsLoading(false);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    (async () => {
      await fetchBoards(0);
    })();
  }, [fetchBoards]);

  return (
    <div>
      <p>게시판 리스트</p>
    </div>
  );
}
