# Estructura por features

## Qué es

La **estructura por features** (también llamada *feature-based* o *vertical slicing*) organiza el código por **dominio de negocio**, no por tipo técnico.

| Antes (por tipo) | Ahora (por feature) |
|---|---|
| `components/`, `hooks/`, `actions/`, `interfaces/` | `features/listings/`, `features/auth/`, … |
| Buscas un listado y saltas entre 4 carpetas | Todo lo de listados vive junto |

Cada feature agrupa lo que necesita para esa capacidad: UI, hooks, actions, tipos y clients de página.

## Por qué usarla

- **Localidad**: al tocar “favoritos”, abres una sola carpeta.
- **Escalabilidad**: nuevas capacidades no hinchan carpetas globales.
- **Límites claros**: se ve qué depende de qué.
- **Onboarding**: un feature nuevo sigue el mismo molde que los existentes.

## Mapa del repositorio

```
/
├── app/                 # Solo App Router de Next.js (rutas delgadas + API)
├── features/            # Dominio de negocio
├── shared/              # Código transversal (UI, lib, hooks)
├── pages/api/auth/      # NextAuth (legado Pages Router)
└── prisma/              # Schema y cliente de base de datos
```

### `app/` — capa de rutas

Contiene lo que Next.js exige para el routing:

- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- `api/**` — route handlers HTTP

Las páginas **no** implementan la lógica de negocio: importan actions/clients desde `features/` y UI desde `shared/` o la feature.

### `features/` — dominio

Cada carpeta es una capacidad del producto:

| Feature | Responsabilidad |
|---|---|
| `auth` | Login, registro, usuario actual (`dbUser`) |
| `listings` | Anuncios, detalle, RentModal, cards |
| `favorites` | Favoritos, HeartButton, `useFavorite` |
| `reservations` | Reservas del host + `getReservations` |
| `trips` | Viajes del huésped |
| `properties` | Propiedades del host |
| `search` | Search + SearchModal |
| `navigation` | Navbar, logo, menú, categorías |

Estructura típica dentro de una feature:

```
features/<nombre>/
├── components/     # UI presentacional (solo props → JSX)
├── hooks/          # Orquestación: estado, API, navegación, store
├── utils/          # Funciones puras (cálculos, query builders)
├── actions/        # Server actions / fetches de servidor
├── types/          # Tipos e interfaces del dominio
├── <Nombre>View.tsx   # Cablea el hook y pasa props al componente
```

No todas las subcarpetas son obligatorias: solo crea las que uses.

### Capas y SOLID

| Capa | Responsabilidad |
|---|---|
| `components/` | Solo renderizar. Sin axios, router, store ni cálculos de dominio. |
| `hooks/` | Caso de uso: estado + side effects. Sin JSX. |
| `utils/` | Transformaciones puras y tipadas. |
| `*View.tsx` | `const vm = useX(props); return <Component {...vm} />` |
| `actions/` | Lectura/escritura en servidor (Prisma). |

Los componentes hacen **una sola cosa**: pintar. La lógica vive en hooks/utils.

### `shared/` — transversal

Código que **varias features** usan y que no pertenece a un dominio:

```
shared/
├── ui/          # Button, Modal, Input, EmptyState, Container, …
├── lib/         # prisma, store (zustand), axios helpers, tipos globales
├── hooks/       # Hooks transversales (p.ej. useCountries)
└── providers/   # Providers de app (Toaster, etc.)
```

## Reglas de dependencia

```
app/  →  features/*  →  shared/*
         features/A  ↛  features/B   (evitar; si hace falta, que sea explícito)
shared/  ↛  features/*               (nunca)
```

1. **`app` depende de `features` y `shared`**, no al revés.
2. **`features` pueden usar `shared`**.
3. **`shared` no importa de `features`**.
4. Una feature **no debería** depender de otra. Excepciones puntuales (p.ej. `ListingCard` usado en trips/favorites) se aceptan de forma consciente.
5. **Sin barrels** (`index.ts` que reexporta todo). Importa siempre el archivo concreto:

```ts
// ✅ Correcto
import { ListingCard } from "@/features/listings/components/ListingCard";

// ❌ Evitar
import { ListingCard } from "@/features/listings";
```

## Alias de importación

Con `tsconfig` (`"@/*": ["./*"]`):

```ts
import { Button } from "@/shared/ui/Button";
import getListings from "@/features/listings/actions/getListings";
import getCurrentUser from "@/features/auth/actions/dbUser";
```

## Qué queda fuera de features

- **`app/api/**`**: las rutas HTTP se quedan en App Router. La lógica pesada puede vivir en `features/*/actions` o `shared/lib`; los handlers importan desde ahí.
- **`pages/api/auth`**: NextAuth permanece en Pages Router.
- **`prisma/`**: schema de base de datos a nivel de proyecto.

## Resumen mental

> Si es una **capacidad del producto** → `features/`.  
> Si es **reutilizable y sin dominio** → `shared/`.  
> Si es **ruta o endpoint de Next** → `app/`.
