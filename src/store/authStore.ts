import { create } from "zustand";
import { AuthStore, User } from "@/types/auth";
import {
  saveAccessToken,
  saveRefreshToken,
  clearAuthStorage,
  getAccessToken,
  getRefreshToken,
} from "@/utils/storage";

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
  hydrate: () => {},
  setUser: (user: User) => {},
  clearError: () => {},
  refreshAccessToken: async () => {},
}));
