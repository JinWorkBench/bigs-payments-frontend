"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ModeSwitch from "@/components/common/ModeSwitch";

export default function Header() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* 로고/홈 링크 */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-blue-600 transition"
          >
            BIGS Portfolio
          </Link>

          {/* 중앙: 게시판 버튼 */}
          <Link
            href="/boards"
            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            게시판
          </Link>

          {/* 우측: 사용자 정보 + 토글 + 로그아웃 */}
          <div className="flex items-center gap-6">
            {/* API 모드 토글 */}
            <ModeSwitch />

            {/* 사용자 정보 또는 로그인 버튼 */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">{user.name}</span>님
                  환영합니다!
                  <span className="text-gray-500 ml-1">({user.username})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
