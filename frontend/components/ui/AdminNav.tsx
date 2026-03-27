"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const adminLinks = [
    { href: '/admin/products?page=1', label: 'Productos' },
    { href: '/admin/farms',           label: 'Fincas'    },
    { href: '/admin/sales',           label: 'Ventas'    },
]

export default function AdminNav() {
    const pathname = usePathname()

    return (
        <nav className="flex gap-4 p-5 bg-white shadow justify-between items-center">
            <Link href="/" className="font-black text-xl text-green-700">
                Canastas Verdes
            </Link>
            <div className="flex gap-4">
                {adminLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`font-bold text-lg p-2 ${
                            pathname.startsWith(link.href.split('?')[0])
                                ? 'text-green-500'
                                : 'text-gray-500 hover:text-green-500'
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}