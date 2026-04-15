# 🌿 Canastas Verdes — Frontend

> Aplicación web para la tienda y panel de administración de **Canastas Verdes**, desarrollada con Next.js 16 y React 19.

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | Framework principal y enrutamiento |
| [React](https://react.dev/) | 19 | Librería de interfaz de usuario |
| [TypeScript](https://www.typescriptlang.org/) | — | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [TanStack Query](https://tanstack.com/query) | — | Caché y fetching de datos |
| [Zustand](https://zustand-demo.pmnd.rs/) | — | Estado global |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | — | Notificaciones |
| [React Dropzone](https://react-dropzone.js.org/) | — | Subida de imágenes |
| [React Calendar](https://github.com/wojtekmaj/react-calendar) | — | Selector de fechas |

---

## ✅ Requisitos

- **Node.js** 20 o superior
- Gestor de paquetes: `npm`, `pnpm`, `yarn` o `bun`
- El backend del proyecto levantado y accesible

---

## 🚀 Instalación

```bash
npm install
```

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```env
API_URL=http://127.0.0.1:3001
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

> Si cambias el puerto o el dominio del backend o del frontend, actualiza estos valores.

---

## 🖥 Uso local

1. Levanta el backend del proyecto.
2. Verifica que `.env` apunte a la URL correcta de la API.
3. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca el entorno de desarrollo con hot reload |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Ejecuta la app compilada |
| `npm run lint` | Revisa el código con ESLint |

---

## 📁 Estructura principal

```
├── app/                  # Rutas y layouts de Next.js
├── components/           # Componentes reutilizables de UI y formularios
├── actions/              # Acciones del cliente para consumo de la API
└── src/
    ├── api.ts            # Cliente y helpers de acceso a la API
    ├── schemas.ts        # Esquemas de validación
    ├── store.ts          # Estado global con Zustand
    └── utils.ts          # Utilidades compartidas
```

---

## 🗺 Rutas principales

### Tienda

| Ruta | Descripción |
|---|---|
| `/` | Página principal del storefront |
| `/(store)/[categoryId]` | Vista de productos por categoría |
| `/(store)/client` | Área de cliente y seguimiento de pedidos |

### Autenticación

| Ruta | Descripción |
|---|---|
| `/auth/login` | Inicio de sesión |
| `/auth/register` | Registro de nuevos usuarios |

### Panel de administración

| Ruta | Descripción |
|---|---|
| `/admin` | Panel administrativo principal |
| `/admin/farms` | Gestión de fincas |
| `/admin/products` | Gestión de productos y variantes |
| `/admin/sales` | Ventas y reportes |

---

## ✨ Funcionalidades

- Catálogo de productos navegable por categorías
- Carrito de compras y flujo de checkout
- Autenticación de usuarios (registro e inicio de sesión)
- Cuenta del cliente y seguimiento de pedidos
- Panel administrativo para fincas, productos, variantes y ventas
- Subida de imágenes con arrastrar y soltar
- Formularios de gestión con validación

---

## 📝 Notas

> Esta app está pensada para trabajar junto con el backend del mismo proyecto.
> Si cambias la API, revisa también los archivos dentro de `actions/` y `src/api.ts`.