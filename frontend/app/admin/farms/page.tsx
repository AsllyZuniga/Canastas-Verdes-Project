import Link from "next/link";
import Heading from "@/components/ui/Heading";
import FarmsTable from "@/components/farms/FarmsTable";
import { FarmsResponseSchema } from "@/src/schemas";

async function getFarms() {
  try {
    const url = `${process.env.API_URL}/farms`;
    const req = await fetch(url, { cache: "no-store" });

    if (!req.ok) {
      return [];
    }

    const json = await req.json();
    const parsed = FarmsResponseSchema.safeParse(json);
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

export default async function FarmsPage() {
  const farms = await getFarms();

  return (
    <>
      <Link href="/admin/farms/new" className="rounded bg-green-400 font-bold py-2 px-10">
        Nueva Finca
      </Link>

      <Heading>Administrar Fincas</Heading>

      <FarmsTable farms={farms} />

      {farms.length === 0 && (
        <p className="mt-5 text-center text-gray-500">No hay fincas registradas por ahora.</p>
      )}
    </>
  );
}
