import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage({ searchParams }: { searchParams: { redirectTo?: string } }) {
  return (
    <LoginForm redirectTo={searchParams.redirectTo} />
  );
}
