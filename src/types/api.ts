// 회원가입 요청 데이터
export interface SignupRequest {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
}

// 로그인 요청 데이터
export interface SigninRequest {
  username: string;
  password: string;
}

// 로그인 응답 데이터
export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// API 응답 타입
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  status?: number;
}