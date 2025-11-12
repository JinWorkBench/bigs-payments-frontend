import Header from '@/components/layouts/Header';
import RootLayoutClient from '@/components/RootLayoutClient';

export default function Home() {
  return (
    <RootLayoutClient>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* 헤더 */}
        <Header />

        {/* 메인 콘텐츠 */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              환영합니다!
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              자유롭게 의견을 나누고 정보를 공유하는 커뮤니티
            </p>

            {/* 여기에 user 정보가 있으면 더 보일 수 있음 */}
          </div>
        </main>
      </div>
    </RootLayoutClient>
  );
}