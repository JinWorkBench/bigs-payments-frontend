import { create } from "zustand";
import { AuthStore, User } from "@/types/auth";
import {
  saveAccessToken,
  saveRefreshToken,
  getAccessToken,
  getRefreshToken,
  clearAuthStorage,
} from "@/utils/storage";
import { refreshTokenAPI } from "@/lib/api/token";

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  // 토큰 저장
  setTokens: (accessToken: string, refreshToken: string, user?: User) => {
    // 로컬 스토리지에 토큰 저장
    saveAccessToken(accessToken);
    saveRefreshToken(refreshToken);

    // Zustand 스토어 상태 업데이트
    set({
      accessToken,
      refreshToken,
      user: user ?? get().user,
    });
  },

  // 토큰 복원
  initializeFromStorage: async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    console.log("토큰 복원 여부");
    console.log("accessToken:", accessToken);
    console.log("refreshToken:", refreshToken);

    // 둘 다 있으면 Zustand에 저장
    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
      });
      console.log("토큰 복원 완료");
      return;
    }

    if (!refreshToken) {
      return;
    }
  },

  // 로그아웃
  logout: () => {
    // 로컬 스토리지에서 토큰 삭제
    clearAuthStorage();

    // Zustand 스토어 상태 초기화
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },

  // 액세스 토큰 갱신
  refreshAccessToken: async () => {
    const refreshToken = get().refreshToken;

    if (!refreshToken) {
      get().logout();
      return;
    }

    try {
      const response = await refreshTokenAPI(refreshToken);

      if (response.success && response.data) {
        // 새 토큰 setTokens 함수로 저장
        get().setTokens(response.data.accessToken, response.data.refreshToken);
      } else {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error("토큰 갱신 실패:", response.error);
        get().logout();
      }
    } catch (error) {
      console.error("토큰 갱신 중 오류 발생:", error);
      get().logout();
    }
  },
}));
