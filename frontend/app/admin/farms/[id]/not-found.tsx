import Link from "next/link";
import Heading from "@/components/ui/Heading";

export default function FarmNotFoundPage() {
  return (
    <div className="space-y-3 text-center">
      <Heading>Finca No Encontrada</Heading>
      <p className="text-gray-600">La finca que intentas editar no existe o fue eliminada.</p>
      <Link href="/admin/farms" className="font-bold text-green-600 hover:text-green-700">
        Volver a Fincas
      </Link>
    </div>
  );
}
