import Logo from "./Logo";
import Link from "next/link";
import CartButton from "./CartButton";
import { cookies } from "next/headers";
import { logoutUser } from "@/actions/auth-actions";

export default async function MainNav() {
  const cookieStore = await cookies();
  const role = cookieStore.get('user_role')?.value;
  const name = cookieStore.get('user_name')?.value;

  return (
    <header className="bg-green-900 shadow-lg relative z-50">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 border-b border-green-800 gap-4 md:gap-0">
        <Logo />
        
        <div className="flex items-center gap-3">
            {role === 'admin' && (
              <Link
                  href="/admin/products?page=1"
                  className="hidden sm:block rounded-full bg-green-800 hover:bg-green-700 text-green-100 font-bold py-2 px-5 text-sm transition-colors shadow-inner"
              >
                  Admin
              </Link>
            )}
            
            {!role ? (
              <>
                <Link href="/auth/login" className="text-white text-sm font-bold hover:text-green-300 transition-colors hidden sm:block">Iniciar Sesión</Link>
                <Link href="/auth/register" className="text-white text-sm font-bold hover:text-green-300 transition-colors hidden sm:block">Registrar</Link>
              </>
            ) : (
                <div className="flex items-center gap-2">
                    <span className="text-green-200 text-sm font-bold hidden sm:block px-2 border-l border-green-700">
                        Hola, {name?.split(' ')[0]}
                    </span>
                    <form action={logoutUser} className="hidden sm:block">
                        <button type="submit" className="text-white text-xs bg-red-600 hover:bg-red-700 font-bold py-1 px-3 rounded transition-colors">
                            Salir
                        </button>
                    </form>
                </div>
            )}
            
            <CartButton />
        </div>
      </div>
    </header>
  );
}
