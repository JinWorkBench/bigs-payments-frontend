import Header from "@/components/layouts/Header";

export default function BoardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-4">{children}</div>
      </main>
    </>
  );
}
