import {
    CategoriesResponseSchema,
    MunicipalitiesResponseSchema,
    PresentationsResponseSchema,
    FarmsResponseSchema,
    ProductVariant
} from "@/src/schemas"
import UploadProductImage from "./UploadProductImage"

async function getFormData() {
    const [cats, munis, presen, farms] = await Promise.all([
        fetch(`${process.env.API_URL}/categories`).then(r => r.json()),
        fetch(`${process.env.API_URL}/municipalities`).then(r => r.json()),
        fetch(`${process.env.API_URL}/presentations`).then(r => r.json()),
        // farms puede no existir aún — si falla retorna array vacío
        fetch(`${process.env.API_URL}/farms`).then(r => r.ok ? r.json() : []).catch(() => []),
    ])
    return {
        categories:     CategoriesResponseSchema.parse(cats),
        municipalities: MunicipalitiesResponseSchema.parse(munis),
        presentations:  PresentationsResponseSchema.parse(presen),
        farms:          FarmsResponseSchema.safeParse(farms).success
                            ? FarmsResponseSchema.parse(farms)
                            : [],
    }
}

export default async function VariantForm({ variant }: { variant?: ProductVariant }) {

    const { categories, municipalities, presentations, farms } = await getFormData()

    return (
        <>
            {/* Nombre del producto */}
            <div className="space-y-2">
                <label htmlFor="productName" className="block">
                    Nombre Producto
                </label>
                <input
                    id="productName"
                    type="text"
                    placeholder="Nombre Producto"
                    className="border border-gray-300 w-full p-2"
                    name="productName"
                    defaultValue={variant?.product.name}
                />
            </div>

            {/* SKU */}
            <div className="space-y-2">
                <label htmlFor="sku" className="block">
                    SKU
                </label>
                <input
                    id="sku"
                    type="text"
                    placeholder="Ej: YF001A"
                    className="border border-gray-300 w-full p-2 font-mono uppercase"
                    name="sku"
                    defaultValue={variant?.sku}
                />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
                <label htmlFor="categoryId" className="block">
                    Categoría
                </label>
                <select
                    id="categoryId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="categoryId"
                    defaultValue={variant?.category.id}
                >
                    <option value="">Seleccionar Categoría</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* Municipio */}
            <div className="space-y-2">
                <label htmlFor="municipalityId" className="block">
                    Municipio
                </label>
                <select
                    id="municipalityId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="municipalityId"
                    defaultValue={variant?.municipality.id}
                >
                    <option value="">Seleccionar Municipio</option>
                    {municipalities.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            {/* Presentación */}
            <div className="space-y-2">
                <label htmlFor="presentationId" className="block">
                    Presentación
                </label>
                <select
                    id="presentationId"
                    className="border border-gray-300 w-full p-2 bg-white"
                    name="presentationId"
                    defaultValue={variant?.presentation.id}
                >
                    <option value="">Seleccionar Presentación</option>
                    {presentations.map(p => (
                        <option key={p.id} value={p.id}>{p.description}</option>
                    ))}
                </select>
            </div>

            {/* Finca (opcional — no falla si el back no tiene farms aún) */}
            {farms.length > 0 && (
                <div className="space-y-2">
                    <label htmlFor="farmId" className="block">
                        Finca <span className="text-gray-400 text-sm font-normal">(opcional)</span>
                    </label>
                    <select
                        id="farmId"
                        className="border border-gray-300 w-full p-2 bg-white"
                        name="farmId"
                        defaultValue={variant?.farm?.id ?? ''}
                    >
                        <option value="">Sin finca asignada</option>
                        {farms.filter(f => f.isActive).map(f => (
                            <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Precio de venta */}
            <div className="space-y-2">
                <label htmlFor="salePrice" className="block">
                    Precio de Venta
                </label>
                <input
                    id="salePrice"
                    type="number"
                    placeholder="Precio de Venta"
                    className="border border-gray-300 w-full p-2"
                    name="salePrice"
                    min={0}
                    defaultValue={variant?.salePrice}
                />
            </div>

            {/* Costo PCC */}
            <div className="space-y-2">
                <label htmlFor="costPcc" className="block">
                    Costo PCC
                </label>
                <input
                    id="costPcc"
                    type="number"
                    placeholder="Costo PCC"
                    className="border border-gray-300 w-full p-2"
                    name="costPcc"
                    min={0}
                    defaultValue={variant ? undefined : 0}
                />
            </div>

            {/* Logística y transporte */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="logisticsCost" className="block">
                        Costo Logística
                    </label>
                    <input
                        id="logisticsCost"
                        type="number"
                        className="border border-gray-300 w-full p-2"
                        name="logisticsCost"
                        min={0}
                        defaultValue={0}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="transportCost" className="block">
                        Costo Transporte
                    </label>
                    <input
                        id="transportCost"
                        type="number"
                        className="border border-gray-300 w-full p-2"
                        name="transportCost"
                        min={0}
                        defaultValue={0}
                    />
                </div>
            </div>

            {/* Precio sugerido */}
            <div className="space-y-2">
                <label htmlFor="suggestedPrice" className="block">
                    Precio Sugerido
                </label>
                <input
                    id="suggestedPrice"
                    type="number"
                    placeholder="Precio Sugerido"
                    className="border border-gray-300 w-full p-2"
                    name="suggestedPrice"
                    min={0}
                    defaultValue={variant?.suggestedPrice}
                />
            </div>

            {/* Inventario */}
            <div className="space-y-2">
                <label htmlFor="inventory" className="block">
                    Inventario
                </label>
                <input
                    id="inventory"
                    type="number"
                    placeholder="Cantidad Disponible"
                    className="border border-gray-300 w-full p-2"
                    name="inventory"
                    min={0}
                    defaultValue={variant?.inventory}
                />
            </div>

            {/* Imagen — reutiliza el componente existente */}
            <UploadProductImage
                currentImage={variant?.product.image ?? undefined}
            />
        </>
    )
}