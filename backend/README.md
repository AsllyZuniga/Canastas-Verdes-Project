# 🌿 Canastas Verdes — Backend API

Backend de la plataforma de e-commerce agrícola colombiana **Canastas Verdes**, construido con NestJS y PostgreSQL. Conecta productores de los municipios de Nariño con consumidores finales a través de un catálogo de productos con variantes por municipio, presentación y categoría.

---

## 🚀 Tecnologías

- **NestJS** — framework backend con TypeScript
- **PostgreSQL** — base de datos relacional
- **TypeORM** — ORM para manejo de entidades y relaciones
- **JWT + Passport** — autenticación y autorización
- **bcrypt** — hash de contraseñas
- **Render** — despliegue en la nube

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/canastas-verdes-backend.git
cd canastas-verdes-backend

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Levantar en desarrollo
npm run start:dev
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=tu_password
DATABASE_NAME=canastas_verdes
JWT_SECRET=canastas_verdes_secret_2026
```

---

## 🌱 Seeder

Resetea la base de datos e inserta los datos iniciales (categorías, municipios y usuarios de prueba):

```bash
npx ts-node src/seeder.ts
```

> ⚠️ **ADVERTENCIA:** Este comando borra **todos los datos** de la base de datos. Úsalo solo en desarrollo.

### Datos que inserta el seeder:

**15 Categorías:**
Autocuidado, Verduras, Sazonadores, Frutas, Snacks, Postres, Aromáticas, Café, Lácteos, Legumbres, Proteínas, Adicionales, Productos de Temporada, Hongo Comestibles, Tubérculo

**6 Municipios de Nariño:**
| Código | Municipio |
|--------|-----------|
| Y | Yacuanquer |
| G | Gualmatán |
| C | Consacá |
| F | La Florida |
| A | Ancuya |
| S | Sandoná |

**2 Usuarios de prueba:**
| Email | Password | Rol |
|-------|----------|-----|
| admin@canastasverdes.com | admin123 | ADMIN |
| cliente@gmail.com | cliente123 | CLIENT |

---

## 🗄️ Modelo de datos

```
category ─────────────┐
municipality ─────────┤
presentation ─────────┼──► product_variant ──► transaction_contents
product ──────────────┘                              │
                                                     ▼
user ──────────────────────────────────────► transaction
```

### Tablas

| Tabla | Descripción |
|-------|-------------|
| `user` | Clientes y administradores |
| `category` | 15 categorías de productos |
| `municipality` | 6 municipios de Nariño |
| `presentation` | Presentaciones (500gr, Atado, Kilo...) |
| `product` | Producto base (nombre e imagen) |
| `product_variant` | Variante con precios, inventario y relaciones |
| `transaction` | Pedidos con orderNumber y status |
| `transaction_contents` | Items de cada pedido |

### ProductVariant — tabla central

```typescript
{
  id, sku,
  costPcc,         // costo que paga Canastas Verdes al productor
  logisticsCost,   // costo de logística
  transportCost,   // costo de transporte
  suggestedPrice,  // precio sugerido calculado
  salePrice,       // precio final para el cliente
  inventory,       // unidades disponibles
  product,         // nombre e imagen base
  category,        // Verduras, Frutas, etc.
  municipality,    // Yacuanquer, Gualmatán, etc.
  presentation     // 500gr, Atado, Kilo, etc.
}
```

---

## 📡 Endpoints

### Públicos (sin autenticación)

```
POST /auth/login
POST /users/register

GET  /categories
GET  /municipalities
GET  /presentations
GET  /products
GET  /product-variants
GET  /product-variants?categoryId=2
GET  /product-variants?municipalityId=1
GET  /product-variants?categoryId=2&municipalityId=1&take=10&skip=0
```

### Cliente autenticado (JWT)

```
POST /transactions              → crear pedido
GET  /transactions/my-orders    → ver mis pedidos
```

### Solo Admin (JWT + rol ADMIN)

```
POST   /products
PATCH  /products/:id
DELETE /products/:id

POST   /product-variants
PATCH  /product-variants/:id
DELETE /product-variants/:id

POST   /categories
PATCH  /categories/:id
DELETE /categories/:id

POST   /municipalities
PATCH  /municipalities/:id
DELETE /municipalities/:id

POST   /presentations
DELETE /presentations/:id

GET    /transactions
PATCH  /transactions/:id/status
DELETE /transactions/:id

GET    /users
PATCH  /users/:id
DELETE /users/:id
```

---

## 🔐 Autenticación

El sistema usa JWT. Para endpoints protegidos envía el token en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Login:**
```json
POST /auth/login
{
  "email": "admin@canastasverdes.com",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGci...",
  "user": {
    "id": 1,
    "name": "Administrador",
    "email": "admin@canastasverdes.com",
    "role": "admin"
  }
}
```

---

## 🛒 Flujo de creación de productos (desde el admin)

El admin debe crear los datos en este orden desde el panel:

```
1. Presentaciones  →  POST /presentations
2. Productos base  →  POST /products
3. Variantes       →  POST /product-variants
```

**Ejemplo de variante:**
```json
POST /product-variants
{
  "sku": "GF001A",
  "costPcc": 2000,
  "logisticsCost": 100,
  "transportCost": 100,
  "suggestedPrice": 2200,
  "salePrice": 2500,
  "inventory": 50,
  "productId": 1,
  "categoryId": 2,
  "municipalityId": 2,
  "presentationId": 1
}
```

---

## 🛍️ Flujo de compra (cliente)

```
1. Cliente ve catálogo  →  GET /product-variants
2. Filtra por categoría →  GET /product-variants?categoryId=2
3. Inicia sesión        →  POST /auth/login
4. Crea pedido          →  POST /transactions
5. Ve sus pedidos       →  GET /transactions/my-orders
```

**Ejemplo de pedido:**
```json
POST /transactions
Authorization: Bearer <token>
{
  "contents": [
    {
      "productVariantId": 1,
      "quantity": 2,
      "price": 2500
    }
  ]
}
```

---

## 📊 Estados de un pedido

| Status | Descripción |
|--------|-------------|
| `pending` | Recién creado, esperando confirmación |
| `confirmed` | Admin confirmó el pedido |
| `delivered` | Pedido entregado al cliente |
| `cancelled` | Pedido cancelado |

---

## 🏗️ Estructura del proyecto

```
src/
├── auth/
│   ├── decorators/       → @Roles()
│   ├── guards/           → JwtAuthGuard, RolesGuard
│   ├── strategies/       → jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── categories/
├── common/
│   └── pipes/            → IdValidationPipe
├── config/
│   └── typeorm.config.ts
├── municipalities/
├── presentations/
├── product-variants/
├── products/
├── seeder/
├── transactions/
├── users/
├── app.module.ts
└── seeder.ts             → punto de entrada del seeder
```

---

## 🌐 Despliegue en Render

1. Crear un servicio Web en Render apuntando al repositorio
2. Configurar las variables de entorno en el dashboard de Render
3. Build command: `npm install && npm run build`
4. Start command: `npm run start:prod`

> ⚠️ En producción cambiar `synchronize: true` a `false` en `typeorm.config.ts`

---

## 📝 Notas importantes

- El inventario se descuenta automáticamente al crear un pedido
- Si se cancela un pedido, el inventario se restaura automáticamente
- Las contraseñas se guardan hasheadas con bcrypt (nunca en texto plano)
- El campo `password` tiene `select: false` — no aparece en consultas normales
- Los IDs usan autoincremento de PostgreSQL (SERIAL)

---

## 👨‍💻 Desarrollado para

**Canastas Verdes** — Plataforma de comercio agrícola  
Conectando productores de Nariño con consumidores  
Pasto, Colombia 🇨🇴
