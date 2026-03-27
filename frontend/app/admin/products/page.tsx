import VariantsTable from "@/components/products/VariantsTable"
import Heading from "@/components/ui/Heading"
import Pagination from "@/components/ui/Pagination"
import { ProductVariantsResponseSchema } from "@/src/schemas"
import { isValidPage } from "@/src/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

async function getVariants(take: number, skip: number) {
    const url = `${process.env.API_URL}/product-variants?take=${take}&skip=${skip}`
    const req = await fetch(url)
    const json = await req.json()
    const data = ProductVariantsResponseSchema.parse(json)
    return {
        variants: data.variants,
        total: data.total
    }
}

type SearchParams = Promise<{ page: string }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {

    const { page } = await searchParams
    if (!isValidPage(+page)) redirect('/admin/products?page=1')

    const variantsPerPage = 10
    const skip = (+page - 1) * variantsPerPage
    const { variants, total } = await getVariants(variantsPerPage, skip)
    const totalPages = Math.ceil(total / variantsPerPage)
    if (+page > totalPages && totalPages > 0) redirect('/admin/products?page=1')

    return (
        <>
            <Link
                href="/admin/products/new"
                className="rounded bg-green-400 font-bold py-2 px-10"
            >
                Nuevo Producto
            </Link>

            <Heading>Administrar Productos</Heading>

            <VariantsTable variants={variants} />

            <Pagination
                page={+page}
                totalPages={totalPages}
                baseUrl="/admin/products"
            />
        </>
    )
}