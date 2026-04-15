# Frontend de Canastas Verdes

Aplicación web desarrollada con Next.js para la tienda y panel de administración de Canastas Verdes. Este README documenta solo el frontend.

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- Zustand
- React Toastify
- React Dropzone
- React Calendar

## Requisitos

- Node.js 20 o superior
- npm, pnpm, yarn o bun
- El backend levantado y accesible desde la URL configurada en las variables de entorno

## Instalación

```bash
npm install
```

## Variables de entorno

El frontend usa estas variables en `.env`:

```env
API_URL=http://127.0.0.1:3001
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

Si cambias el puerto o el dominio del backend/frontend, actualiza esos valores.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `dev`: arranca el entorno de desarrollo
- `build`: genera la versión de producción
- `start`: ejecuta la app compilada
- `lint`: revisa el código con ESLint

## Uso local

1. Levanta el backend.
2. Verifica que `.env` apunte a la API correcta.
3. Ejecuta `npm run dev`.
4. Abre `http://localhost:3000`.

## Estructura principal

- `app/`: rutas y layouts de Next.js
- `components/`: componentes reutilizables de UI y formularios
- `actions/`: acciones del lado del cliente para consumo de la API
- `src/api.ts`: cliente o helpers de acceso a la API
- `src/schemas.ts`: esquemas de validación
- `src/store.ts`: estado global con Zustand
- `src/utils.ts`: utilidades compartidas

## Rutas principales

- `/`: página principal del storefront
- `/(store)/[categoryId]`: vista por categoría
- `/(store)/client`: área de cliente
- `/auth/login` y `/auth/register`: autenticación
- `/admin`: panel administrativo
- `/admin/farms`: gestión de fincas
- `/admin/products`: gestión de productos y variantes
- `/admin/sales`: ventas y reportes

## Funcionalidades

- catálogo de productos por categorías
- carrito de compras y checkout
- autenticación de usuarios
- cuenta del cliente y seguimiento de pedidos
- panel administrativo para fincas, productos, variantes y ventas
- subida de imágenes y formularios de gestión

## Notas

- La app está pensada para trabajar junto con el backend del mismo proyecto.
- Si cambias la API, revisa también los archivos dentro de `actions/` y `src/api.ts`.
