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

  setTokens: (accessToken: string, refreshToken: string, user?: User) => {
    saveAccessToken(accessToken);
    saveRefreshToken(refreshToken);

    set({
      accessToken,
      refreshToken,
      user: user ?? get().user,
    });
  },

  logout: () => {},
  hydrate: () => {},
  setUser: (user: User) => {},
  clearError: () => {},
  refreshAccessToken: async () => {},
}));
