import RegisterForm from "@/components/auth/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('user_role')?.value;

  if (role === 'admin') {
    redirect('/admin/products?page=1');
  }

  if (role === 'client') {
    redirect('/client/catalog');
  }

  return (
    <RegisterForm />
  );
}
