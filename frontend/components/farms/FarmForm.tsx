import { Farm } from "@/src/schemas"
import UploadProductImage from "../products/UploadProductImage"

export default function FarmForm({ farm }: { farm?: Farm }) {
    return (
        <>
            <div className="space-y-2">
                <label htmlFor="name" className="block">Nombre Finca</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la Finca"
                    className="border border-gray-300 w-full p-2"
                    name="name"
                    defaultValue={farm?.name}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="address" className="block">Dirección</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Vereda El Rosal, Yacuanquer, Nariño"
                    className="border border-gray-300 w-full p-2"
                    name="address"
                    defaultValue={farm?.address}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="municipality" className="block">Municipio</label>
                    <input
                        id="municipality"
                        type="text"
                        placeholder="Yacuanquer"
                        className="border border-gray-300 w-full p-2"
                        name="municipality"
                        defaultValue={farm?.municipality ?? ''}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="department" className="block">Departamento</label>
                    <input
                        id="department"
                        type="text"
                        placeholder="Nariño"
                        className="border border-gray-300 w-full p-2"
                        name="department"
                        defaultValue={farm?.department ?? ''}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="phone" className="block">Teléfono</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="+57 300 123 4567"
                        className="border border-gray-300 w-full p-2"
                        name="phone"
                        defaultValue={farm?.phone ?? ''}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="contacto@finca.com"
                        className="border border-gray-300 w-full p-2"
                        name="email"
                        defaultValue={farm?.email ?? ''}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="block">Descripción</label>
                <textarea
                    id="description"
                    placeholder="Describe la finca..."
                    className="border border-gray-300 w-full p-2"
                    name="description"
                    rows={3}
                    defaultValue={farm?.description ?? ''}
                />
            </div>

            {/* Reutiliza el mismo componente de imagen que ya tienes */}
            <UploadProductImage currentImage={farm?.image ?? undefined} />
        </>
    )
}