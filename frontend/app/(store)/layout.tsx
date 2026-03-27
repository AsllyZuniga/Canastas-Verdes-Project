import CartDrawer from "@/components/cart/CartDrawer";
import FloatingCart from "@/components/cart/FloatingCart";
import MainNav from "@/components/ui/MainNav";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <MainNav />
        <main className="min-h-[calc(100vh-80px)] overflow-x-hidden relative">
            <div className="pt-10 pb-32 px-4 md:px-10 max-w-7xl mx-auto">
                {children}
            </div> 
        </main>

        <FloatingCart />
        <CartDrawer />
        <ToastNotification />
      </>
    );
}