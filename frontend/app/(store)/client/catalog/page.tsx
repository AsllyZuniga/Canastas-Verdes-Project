import ProductCard from "@/components/products/ProductCard";
import { ProductVariantsResponseSchema } from "@/src/schemas";

const API_BASE_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:3001";

async function getAllVariants() {
  try {
    const url = `${API_BASE_URL}/product-variants`;
    const req = await fetch(url, {
      next: {
        tags: ["all-products"],
      },
    });

    if (!req.ok) {
      return [];
    }

    const json = await req.json();
    const data = ProductVariantsResponseSchema.parse(json);
    return data.variants;
  } catch {
    return [];
  }
}

export default async function ClientCatalogPage() {
  const variants = await getAllVariants();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Catalogo de Productos</h2>
        <p className="mt-1 text-sm text-slate-600">
          Explora productos y agregalos a tu carrito desde aqui.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {variants.map((variant) => (
          <ProductCard key={variant.id} variant={variant} />
        ))}
      </div>

      {variants.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No hay productos disponibles por ahora.
        </div>
      )}
    </div>
  );
}
