import { Farm } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteFarmForm({ farmId }: { farmId: Farm['id'] }) {

    const handleDelete = async () => {
        "use server"
        const url = `${process.env.API_URL}/farms/${farmId}`
        await fetch(url, { method: 'DELETE' })
        revalidatePath('/admin/farms')
    }

    return (
        <form action={handleDelete}>
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value="Eliminar"
            />
        </form>
    )
}