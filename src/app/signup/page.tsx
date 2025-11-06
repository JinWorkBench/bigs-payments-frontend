import SignupForm from "@/components/auth/signup/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
        <SignupForm />
      </div>
    </main>
  );
}
