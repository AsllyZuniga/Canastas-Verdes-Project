import AddFarmForm from "@/components/farms/AddFarmForm";
import FarmForm from "@/components/farms/FarmForm";
import Heading from "@/components/ui/Heading";

export default function NewFarmPage() {
  return (
    <>
      <Heading>Nueva Finca</Heading>

      <AddFarmForm>
        <FarmForm />
      </AddFarmForm>
    </>
  );
}
