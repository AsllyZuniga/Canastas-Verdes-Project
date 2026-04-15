import { notFound } from "next/navigation";
import EditFarmForm from "@/components/farms/EditFarmForm";
import FarmForm from "@/components/farms/FarmForm";
import Heading from "@/components/ui/Heading";
import { FarmSchema } from "@/src/schemas";

async function getFarmById(id: string) {
  const url = `${process.env.API_URL}/farms/${id}`;
  const req = await fetch(url, { cache: "no-store" });

  if (!req.ok) {
    return null;
  }

  const json = await req.json();
  const parsed = FarmSchema.safeParse(json);
  return parsed.success ? parsed.data : null;
}

type Params = Promise<{ id: string }>;

export default async function EditFarmPage({ params }: { params: Params }) {
  const { id } = await params;
  const farm = await getFarmById(id);

  if (!farm) {
    notFound();
  }

  return (
    <>
      <Heading>Editar Finca</Heading>

      <EditFarmForm>
        <FarmForm farm={farm} />
      </EditFarmForm>
    </>
  );
}
