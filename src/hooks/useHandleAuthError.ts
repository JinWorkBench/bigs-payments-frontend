"use client";

import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { refreshTokenAPI } from "@/lib/api/token";
import type { ApiResponse } from "@/types/api";

export const useHandleAuthError = () => {
  const { setTokens } = useAuthStore();

  return useCallback(
    async <T extends ApiResponse>(
      apiFunction: (...args: unknown[]) => Promise<T>,
      args: unknown[] = [],
    ): Promise<T | null> => {
      try {
        console.log("API 호출 시작");

        // 기존 API 호출
        const response = await apiFunction(...args);

        // 401 에러 확인
        if (response.status === 401) {
          console.log("401 에러 감지");

          const refreshToken = useAuthStore.getState().refreshToken;

          // refreshToken 이 없을 경우 로그아웃 처리
          if (!refreshToken) {
            console.error("Refresh Token이 없습니다.");
            useAuthStore.getState().logout();
            return null;
          }

          // 토큰 갱신 API 호출
          console.log("토큰 갱신 중...");
          const refreshResponse = await refreshTokenAPI(refreshToken);

          if (!refreshResponse.success || !refreshResponse.data) {
            console.error("토큰 갱신 실패:", refreshResponse.error);
            useAuthStore.getState().logout();
            return null;
          }

          // 새 토큰 저장
          const { accessToken, refreshToken: newRefreshToken } =
            refreshResponse.data;

          setTokens(accessToken, newRefreshToken);
          console.log("토큰 갱신 완료");

          // API 자동 재호출
          console.log("API 재호출 중...");
          const retryResponse = await apiFunction(...args);

          // 401 에러 재확인
          if (retryResponse.status === 401) {
            console.error("토큰 갱신 재실패");
            useAuthStore.getState().logout();
            return null;
          }

          console.log("API 재호출 성공");
          return retryResponse;
        }

        // 401 오류 제외
        console.log(
          response.success ? "API 호출 성공" : "API 호출 실패 (401 제외)",
        );
        return response;
      } catch (error) {
        console.error("API 호출 중 에러:", error);
        return null;
      }
    },
    [setTokens],
  );
};
