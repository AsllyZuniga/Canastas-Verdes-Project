import { z } from 'zod'

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    categoryId: z.number()
})

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number()
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string()
})

export const CategoriesResponseSchema = z.array(CategorySchema)
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema)
})

const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
}).extend({
    productId: z.number(),
    quantity: z.number()
})
export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema)

export const CouponResponseSchema = z.object({
    name: z.string().default(''),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0)
})

const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number()
})
export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z.array(OrderContentSchema).min(1, { message: 'El Carrito no puede ir vacio' })
})

export const SuccessResponseSchema = z.object({
    message: z.string()
})
export const ErrorResponseSchema = z.object({
    message: z.array(z.string()),
    error: z.string(),
    statusCode: z.number()
})

// Transacciones ajustadas al back real
// TransactionContents.product ES una ProductVariant (no un Product simple)
export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.coerce.number(),
    product: z.object({
        id: z.number(),
        sku: z.string(),
        salePrice: z.coerce.number(),
        product: z.object({
            id: z.number(),
            name: z.string(),
            image: z.string().nullable().default('default.svg')
        })
    })
})

export const TransactionResponseSchema = z.object({
    id: z.number(),
    orderNumber: z.string(),
    total: z.coerce.number(),
    status: z.enum(['pending', 'confirmed', 'delivered', 'cancelled']),
    transactionDate: z.string(),
    contents: z.array(ContentsSchema)
})
export const TransactionsResponseSchema = z.array(TransactionResponseSchema)

export const ProductFormSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio' }),
    price: z.coerce.number({ message: 'Precio no válido' })
        .min(1, { message: 'El Precio debe ser mayor a 0' }),
    image: z.string({ message: 'La imagen es obligatoria' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(1, { message: 'El inventario debe ser mayor a 0' }),
    categoryId: z.coerce.number({ message: 'La Categoria no es válida' })
        .min(1, { message: 'La Categoria no es válida' })
})

// ─── NUEVOS ────────────────────────────────────────────────────────────────

export const MunicipalitySchema = z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    isActive: z.boolean().default(true)
})
export const MunicipalitiesResponseSchema = z.array(MunicipalitySchema)

export const PresentationSchema = z.object({
    id: z.number(),
    description: z.string()
})
export const PresentationsResponseSchema = z.array(PresentationSchema)

export const ProductBaseSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string().nullable().default('default.svg')
})

export const FarmBaseSchema = z.object({
    id: z.number(),
    name: z.string(),
    municipality: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    isActive: z.boolean().default(true)
})

export const ProductVariantSchema = z.object({
    id: z.number(),
    sku: z.string(),
    costPcc: z.coerce.number(),
    logisticsCost: z.coerce.number(),
    transportCost: z.coerce.number(),
    suggestedPrice: z.coerce.number(),
    salePrice: z.coerce.number(),
    inventory: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    product: ProductBaseSchema,
    category: CategorySchema,
    municipality: MunicipalitySchema,
    presentation: PresentationSchema,
    farm: FarmBaseSchema.nullable().optional()
})

export const ProductVariantsResponseSchema = z.object({
    variants: z.array(ProductVariantSchema),
    total: z.number()
})
export const ProductVariantsArraySchema = z.array(ProductVariantSchema)

export const FarmSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable().optional(),
    address: z.string(),
    municipality: z.string().nullable().optional(),
    department: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    image: z.string().nullable().optional(),
    isActive: z.boolean().default(true),
    ownerId: z.number().nullable().optional(),
    variants: z.array(ProductVariantSchema).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional()
})
export const FarmsResponseSchema = z.array(FarmSchema)

export const VariantFormSchema = z.object({
    sku: z.string()
        .min(1, { message: 'El SKU es obligatorio' })
        .max(20, { message: 'El SKU no puede superar 20 caracteres' }),
    costPcc: z.coerce.number({ message: 'Costo no válido' })
        .min(0, { message: 'El costo no puede ser negativo' }),
    logisticsCost: z.coerce.number().min(0).default(0),
    transportCost: z.coerce.number().min(0).default(0),
    suggestedPrice: z.coerce.number().min(0).default(0),
    salePrice: z.coerce.number({ message: 'Precio de venta no válido' })
        .min(1, { message: 'El precio debe ser mayor a 0' }),
    inventory: z.coerce.number({ message: 'Inventario no válido' })
        .min(0, { message: 'El inventario no puede ser negativo' }),
    productName: z.string()
        .min(1, { message: 'El nombre del producto es obligatorio' }),
    categoryId: z.coerce.number({ message: 'La categoría no es válida' })
        .min(1, { message: 'Selecciona una categoría' }),
    municipalityId: z.coerce.number({ message: 'El municipio no es válido' })
        .min(1, { message: 'Selecciona un municipio' }),
    presentationId: z.coerce.number({ message: 'La presentación no es válida' })
        .min(1, { message: 'Selecciona una presentación' }),
    farmId: z.coerce.number().optional()
})

export const FarmFormSchema = z.object({
    name: z.string()
        .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    description: z.string().optional(),
    address: z.string()
        .min(1, { message: 'La dirección es obligatoria' }),
    municipality: z.string().optional(),
    department: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email({ message: 'Email no válido' }).optional().or(z.literal('')),
    image: z.string().optional(),
})

// ─── Tipos ─────────────────────────────────────────────────────────────────

export type Product = z.infer<typeof ProductSchema>
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>
export type Coupon = z.infer<typeof CouponResponseSchema>
export type Transaction = z.infer<typeof TransactionResponseSchema>
export type Municipality = z.infer<typeof MunicipalitySchema>
export type Presentation = z.infer<typeof PresentationSchema>
export type ProductVariant = z.infer<typeof ProductVariantSchema>
export type Farm = z.infer<typeof FarmSchema>