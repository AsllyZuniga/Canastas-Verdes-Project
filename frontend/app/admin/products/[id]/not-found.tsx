import Heading from "@/components/ui/Heading"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="text-center">
            <Heading>Finca No Encontrada</Heading>
            <p>Tal vez quieras volver a{' '}
                <Link className="text-green-400" href="/admin/farms">
                    Fincas
                </Link>
            </p>
        </div>
    )
}