import LoginForm from "@/components/auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ redirectTo?: string }> }) {
  const cookieStore = await cookies();
  const role = cookieStore.get('user_role')?.value;

  if (role === 'admin') {
    redirect('/admin/products?page=1');
  }

  if (role === 'client') {
    redirect('/client/catalog');
  }

  const resolvedParams = await searchParams;

  return (
    <LoginForm redirectTo={resolvedParams.redirectTo} />
  );
}
