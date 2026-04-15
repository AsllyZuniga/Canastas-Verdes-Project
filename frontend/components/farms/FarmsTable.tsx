import Link from "next/link";
import { Farm } from "@/src/schemas";
import DeleteFarmForm from "./DeleteFarmForm";
import ToggleFarmForm from "./ToggleFarmForm";

export default function FarmsTable({ farms }: { farms: Farm[] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full table-auto">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Municipio</th>
            <th className="p-3 text-left">Departamento</th>
            <th className="p-3 text-center">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {farms.map((farm) => (
            <tr key={farm.id} className="border-b bg-white">
              <td className="p-3 font-bold text-slate-800">{farm.name}</td>
              <td className="p-3 text-slate-600">{farm.municipality ?? "—"}</td>
              <td className="p-3 text-slate-600">{farm.department ?? "—"}</td>
              <td className="p-3 text-center">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-bold ${
                    farm.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {farm.isActive ? "Activa" : "Inactiva"}
                </span>
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-3 text-sm font-semibold">
                  <Link
                    href={`/admin/farms/${farm.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </Link>
                  <ToggleFarmForm farmId={farm.id} isActive={farm.isActive} />
                  <DeleteFarmForm farmId={farm.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
