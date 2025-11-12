"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBoardAPI } from "@/lib/api/board";
import { useHandleAuthError } from "@/hooks/useHandleAuthError";

export const useCreateBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const withAuthError = useHandleAuthError();

  const createBoard = async (
    title: string,
    content: string,
    category: string,
    file?: File,
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await withAuthError(() =>
      createBoardAPI(title, content, category, file),
    );

    if (!response || !response.success) {
      setError(response?.error || "게시글 생성 실패");
      setIsLoading(false);
      return;
    }

    console.log("게시글 생성 성공");
    setIsLoading(false);

    // 목록으로 이동
    router.push("/boards");
  };

  return { createBoard, isLoading, error };
};
