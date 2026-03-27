import { Farm } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function ToggleFarmForm({
    farmId,
    isActive
}: {
    farmId: Farm['id']
    isActive: boolean
}) {
    const handleToggle = async () => {
        "use server"
        const url = `${process.env.API_URL}/farms/${farmId}/toggle`
        await fetch(url, { method: 'PATCH' })
        revalidatePath('/admin/farms')
    }

    return (
        <form action={handleToggle}>
            <input
                type="submit"
                className={`cursor-pointer font-bold ${
                    isActive
                        ? 'text-yellow-600 hover:text-yellow-800'
                        : 'text-green-600 hover:text-green-800'
                }`}
                value={isActive ? 'Desactivar' : 'Activar'}
            />
        </form>
    )
}