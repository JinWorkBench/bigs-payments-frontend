"use client";

import { useCallback, useEffect, useState } from "react";
import { getBoardsAPI } from "@/lib/api/board";
import { useWaitForToken } from "@/hooks/useWaitForToken";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";
import type { BoardsPageResponse } from "@/types/board";

export const useBoardList = () => {
  const [boardsData, setBoardsData] = useState<BoardsPageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const waitForToken = useWaitForToken();
  const withAuthError = useHandleAuthError();

  // API 호출
  const fetchBoards = useCallback(
    async (page: number) => {
      setIsLoading(true);
      setError(null);

      const response = await withAuthError(() => getBoardsAPI(page, 10));

      if (!response || !response.success) {
        setError(response?.error || "게시글 조회 실패");
        setIsLoading(false);
        return;
      }

      if (response.data) {
        setBoardsData(response.data);
        setCurrentPage(page);
      }

      setIsLoading(false);
    },
    [withAuthError],
  );

  // 초기 데이터 로드
  useEffect(() => {
    (async () => {
      // 토큰 대기
      const isTokenReady = await waitForToken();

      if (!isTokenReady) {
        setError("토큰 조회 실패. 다시 로그인해주세요.");
        setIsLoading(false);
        return;
      }

      await fetchBoards(0);
    })();
  }, [waitForToken, fetchBoards]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    fetchBoards(newPage);
  };

  return {
    boardsData,
    isLoading,
    error,
    currentPage,
    handlePageChange,
  };
};
