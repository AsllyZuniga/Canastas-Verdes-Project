import { ProductVariant } from "@/src/schemas"
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import DeleteVariantForm from "./DeleteVariantForm"

export default function VariantsTable({ variants }: { variants: ProductVariant[] }) {
    return (
        <table className="w-full mt-5 table-auto">
            <thead className="bg-slate-800 text-white">
                <tr>
                    <th className="p-2">Producto</th>
                    <th className="p-2">SKU</th>
                    <th className="p-2">Categoría</th>
                    <th className="p-2">Municipio</th>
                    <th className="p-2">Presentación</th>
                    <th className="p-2">Precio Venta</th>
                    <th className="p-2">Inventario</th>
                    <th className="p-2">Finca</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {variants.map(variant => (
                    <tr key={variant.id} className="border-b">
                        <td className="p-3 text-lg text-gray-800 font-bold">
                            {variant.product.name}
                        </td>
                        <td className="p-3 text-center font-mono text-sm text-gray-500">
                            {variant.sku}
                        </td>
                        <td className="p-3 text-center text-gray-600">
                            {variant.category.name}
                        </td>
                        <td className="p-3 text-center text-gray-600">
                            {variant.municipality.name}
                        </td>
                        <td className="p-3 text-center text-gray-600">
                            {variant.presentation.description}
                        </td>
                        <td className="p-3 text-center font-bold text-gray-900">
                            {formatCurrency(variant.salePrice)}
                        </td>
                        <td className="p-3 text-center">
                            <span className={variant.inventory < 10
                                ? 'text-red-600 font-bold'
                                : 'text-gray-600'
                            }>
                                {variant.inventory}
                            </span>
                        </td>
                        <td className="p-3 text-center text-gray-500 text-sm">
                            {variant.farm?.name ?? '—'}
                        </td>
                        <td className="p-3 text-center flex justify-center gap-3">
                            <Link
                                href={`/admin/products/${variant.id}/edit`}
                                className="text-blue-600 hover:text-blue-800 font-bold"
                            >
                                Editar
                            </Link>
                            <DeleteVariantForm variantId={variant.id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}