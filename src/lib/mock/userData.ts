import type { User } from "@/types/auth";

// 목업 사용자 데이터
export const mockUser: User = {
  username: "test@example.com",
  name: "목업 사용자",
};

// 목업 엑세스 토큰 (JWT 형식)
export const mockAccessToken =
  "mock.access.token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiLthYzsiqTtirgg7IKs7Jqp7J6QIiwiaWF0IjoxNjMyMzQ1Njc4fQ.mockSignature";

// 목업 리프레시 토큰 (JWT 형식)
export const mockRefreshToken =
  "mock.refresh.token.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjMyMzQ1Njc4fQ.mockRefreshSignature";
