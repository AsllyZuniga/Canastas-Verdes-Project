import AdminNav from "@/components/ui/AdminNav";
import ToastNotification from "@/components/ui/ToastNotification";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const role = cookieStore.get('user_role')?.value;

  if (role !== 'admin') {
    redirect('/auth/login?redirectTo=/admin/products?page=1');
  }

  return (
    <>
        <AdminNav />
        <div className="lg:min-h-screen mx-auto mt-10 w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow w-full mx-auto p-6 sm:p-8 lg:p-10 my-10" >
            {children}
          </div>
        </div>
        <ToastNotification />
    </>
  );
}