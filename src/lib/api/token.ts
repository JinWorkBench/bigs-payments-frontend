import type { ApiResponse, AuthTokenResponse } from "@/types/api";

export const refreshTokenAPI = async (
  refreshToken: string,
): Promise<ApiResponse<AuthTokenResponse>> => {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "토큰 갱신 실패",
      };
    }

    return {
      success: true,
      message: "토큰 갱신 성공",
      data: data as AuthTokenResponse,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류 발생";
    return {
      success: false,
      error: errorMessage,
    };
  }
};
