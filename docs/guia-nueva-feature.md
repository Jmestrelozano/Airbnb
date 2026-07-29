# Guía: crear e implementar una nueva feature

Documento práctico para añadir una capacidad nueva al proyecto. Complementa [estructura-por-features.md](./estructura-por-features.md).

## Checklist rápido

1. Definir el **nombre** y el **límite** de la feature.
2. Crear la carpeta en `features/<nombre>/`.
3. Añadir solo las subcarpetas necesarias (`components`, `hooks`, `utils`, `actions`, `types`, …).
4. Crear la **ruta delgada** en `app/` (si hay página).
5. Crear **API route** en `app/api/` solo si hay endpoint HTTP (lógica en la feature o shared).
6. Reutilizar `shared/` antes de inventar UI nueva.
7. Separar View (composición) + component (presentacional) + hook (lógica).
8. Imports **directos al archivo** (sin `index.ts` barrel).
9. Verificar con `npx tsc --noEmit` y/o `npm run build`.

---

## 1. Definir la feature

Antes de crear carpetas, responde:

- ¿Qué problema de negocio resuelve? (ej. “mensajes entre host y huésped”)
- ¿Es dominio propio o es UI genérica?  
  - Dominio → `features/`  
  - Genérico (botón, input, toast) → `shared/`
- ¿Qué páginas/rutas necesita?
- ¿Qué datos lee/escribe? (Prisma, API externa)

**Nombre**: minúsculas, una palabra o kebab-case corto: `messages`, `reviews`, `payments`.

---

## 2. Crear la carpeta

Ejemplo para una feature `reviews`:

```
features/reviews/
├── components/
│   └── ReviewCard.tsx          # presentacional
├── hooks/
│   └── useReviews.ts           # orquestación
├── utils/                      # opcional
├── actions/
│   └── getReviews.ts
├── types/
│   └── reviewCard.ts
└── ReviewsView.tsx             # View: hook → props → component
```

No crees subcarpetas vacías “por si acaso”.

---

## 3. Tipos

Coloca interfaces/props en `features/<nombre>/types/<archivo>.ts`.

```ts
// features/reviews/types/reviewCard.ts
import { TUser } from "@/shared/lib/types/global";

export interface ReviewCardProps {
  id: string;
  body: string;
  currentUser?: TUser;
}
```

Tipos compartidos entre todo el proyecto (`SafeUser`, `SafeListing`, etc.) viven en:

```
shared/lib/types/global.ts
```

Importa el tipo desde su archivo, no desde un barrel:

```ts
import { ReviewCardProps } from "@/features/reviews/types/reviewCard";
```

---

## 4. Components (presentacionales)

UI que solo tiene sentido en esta feature. **Sin lógica de negocio**:

```tsx
// features/reviews/components/ReviewCard.tsx
"use client";

import { ReviewCardProps } from "@/features/reviews/types/reviewCard";
import { Heading } from "@/shared/ui/Heading";

export const ReviewCard: React.FC<ReviewCardProps> = ({ body }) => {
  return (
    <div>
      <Heading title="Reseña" />
      <p>{body}</p>
    </div>
  );
};
```

La lógica (API, estado, navegación) va en `hooks/`. Los cálculos puros van en `utils/`.
La composición vive en `*View.tsx`:

```tsx
// features/reviews/ReviewsView.tsx
"use client";

import { useReviews } from "@/features/reviews/hooks/useReviews";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";

export default function ReviewsView(props) {
  const { reviews } = useReviews(props);
  return reviews.map((review) => <ReviewCard key={review.id} {...review} />);
}
```

**Cuándo va a `shared/ui` en vez de la feature**

| Va a `shared/ui` | Se queda en la feature |
|---|---|
| Se usará en 2+ features sin lógica de dominio | Solo tiene sentido en este dominio |
| Button, Modal, Input, EmptyState | ReviewCard, RentModal, HeartButton |

Si un componente de `shared` necesitara un hook de una feature, **no** lo pongas en `shared`: muévelo a la feature (como `HeartButton` en favorites).

---

## 5. Actions (servidor)

Funciones async usadas en Server Components o llamadas desde API:

```ts
// features/reviews/actions/getReviews.ts
import prismadb from "@/shared/lib/prismadb";

export default async function getReviews(listingId: string) {
  const reviews = await prismadb.review.findMany({
    where: { listingId },
  });
  return reviews;
}
```

Uso desde la página:

```ts
import getReviews from "@/features/reviews/actions/getReviews";
```

---

## 6. Hooks (cliente)

Solo si el estado/comportamiento es específico de la feature:

```ts
// features/reviews/hooks/useReviewForm.ts
"use client";

export const useReviewForm = () => {
  // ...
};
```

Hooks transversales (países, etc.) → `shared/hooks/`.

---

## 7. Página en `app/` (ruta delgada)

La ruta sigue las convenciones de App Router. La página solo cablea datos + UI.

```tsx
// app/reviews/page.tsx
import { EmptyState } from "@/shared/ui/EmptyState";
import ReviewsView from "@/features/reviews/ReviewsView";
import getCurrentUser from "@/features/auth/actions/dbUser";
import getReviewsByUser from "@/features/reviews/actions/getReviewsByUser";

export const dynamic = "force-dynamic";

const ReviewsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reviews = await getReviewsByUser(currentUser.id);

  if (!reviews.length) {
    return (
      <EmptyState
        title="No reviews"
        subtitle="You have not written any reviews yet."
      />
    );
  }

  return <ReviewsView reviews={reviews} currentUser={currentUser} />;
};

export default ReviewsPage;
```

Client de la feature:

```tsx
// features/reviews/ReviewsView.tsx
"use client";

import { Container } from "@/shared/ui/Container";
import { ReviewCard } from "@/features/reviews/components/ReviewCard";

export default function ReviewsView({ reviews, currentUser }) {
  return (
    <Container>
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} currentUser={currentUser} />
      ))}
    </Container>
  );
}
```

---

## 8. API routes (`app/api`)

Las rutas HTTP **permanecen** en `app/api`. No muevas el archivo de route a `features/`.

Patrón recomendado:

```ts
// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import getCurrentUser from "@/features/auth/actions/dbUser";
import prismadb from "@/shared/lib/prismadb";
// o: import { createReview } from "@/features/reviews/actions/createReview";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  // lógica o llamada a action de la feature
  return NextResponse.json({ ok: true });
}
```

Si la lógica crece, extráela a `features/reviews/actions/` y deja el `route.ts` delgado.

---

## 9. Enlazar desde navegación u otras features

Si la feature necesita entrada en el menú, edita `features/navigation/components/UserMenu.tsx` (o el sitio que corresponda) y usa `router.push("/reviews")`.

Si otra feature necesita un componente tuyo:

```ts
import { ReviewCard } from "@/features/reviews/components/ReviewCard";
```

Hazlo solo cuando sea necesario; preferible no acoplar features entre sí.

---

## 10. Qué no hacer

| Evitar | Hacer en su lugar |
|---|---|
| `features/reviews/index.ts` reexportando todo | Import al archivo concreto |
| Meter Button “de reviews” en `shared` si solo sirve aquí | Dejarlo en `features/reviews/components` |
| Poner lógica de negocio gorda en `app/page.tsx` | Actions + Client en la feature |
| Que `shared/ui` importe `@/features/...` | Mover ese componente a la feature |
| Crear `interfaces/` global otra vez | `features/*/types` o `shared/lib/types` |
| Copiar `EmptyState` / `Container` | Reutilizar `@/shared/ui/...` |

---

## 11. Plantilla mínima (copiar/pegar mental)

```bash
mkdir -p features/mi-feature/components features/mi-feature/actions features/mi-feature/types
# opcional:
mkdir -p features/mi-feature/hooks
mkdir -p app/mi-feature
# si hay API:
mkdir -p app/api/mi-feature
```

Archivos mínimos frecuentes:

1. `features/mi-feature/types/...`
2. `features/mi-feature/components/...` o `MiFeatureView.tsx`
3. `features/mi-feature/hooks/...` y/o `actions/...`
4. `app/mi-feature/page.tsx`

---

## 12. Verificación

```bash
npx tsc --noEmit
npm run build
```

Comprueba también en el navegador la ruta nueva y los flujos que toquen auth o datos.

---

## Referencia de features existentes

Úsalas como plantilla según el caso:

| Quieres… | Copia el patrón de… |
|---|---|
| Página lista + view | `favorites`, `trips`, `properties` |
| Detalle dinámico `[id]` | `listings` (`ListingView` + `useListing`) |
| Modal global en layout | `auth` (`LoginModalView`), `search`, `listings` (`RentModalView`) |
| Hook + botón de acción | `favorites` (`useFavorite` + `HeartButton` + `HeartButtonView`) |
| Pieza de navbar | `navigation` (`UserMenuView`, `CategoriesView`), `search` (`SearchView`) |
| Action de lectura DB | `listings/actions/getListings.ts` |
| Util puro | `listings/utils/getListingPrice.ts`, `search/utils/buildSearchQueryUrl.ts` |

---

## Resumen

1. Feature = carpeta en `features/` con lo suyo.  
2. Página = cableado fino en `app/`.  
3. API = handler en `app/api`, lógica en feature/`shared`.  
4. Compartido sin dominio = `shared/`.  
5. Imports al archivo; sin barrels.
