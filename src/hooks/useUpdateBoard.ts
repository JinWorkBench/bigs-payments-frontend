"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateBoardAPI } from "@/lib/api/board";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";

export const useUpdateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const withAuthError = useHandleAuthError();

  const updateBoard = async (
    postId: number,
    title: string,
    content: string,
    category: string,
    file?: File,
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await withAuthError(() =>
      updateBoardAPI(postId, title, content, category, file),
    );

    if (!response || !response.success) {
      setError(response?.error || "게시글 수정 실패");
      setIsLoading(false);
      return;
    }

    console.log("게시글 수정 성공");
    setIsLoading(false);

    // 상세 페이지로 이동
    router.push(`/boards/${postId}`);
  };

  return { updateBoard, isLoading, error };
};
