# Forms Dashboard

A small app to manage forms (list + create/edit) with role-based access, form validation, SSR/SSG, SEO, and a lightweight REST API. No real database — **JSON file** (`data/forms.json`) or in-memory fallback.

## Tech

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS**
- **React Hook Form** + **Zod** (shared schema client/server)
- **Zustand** (auth state + toasts)
- **Route Handlers** as REST API
- **Next.js Metadata** (SEO / OpenGraph / Twitter) + `next/image`

## Project structure (Next.js 15 App Router)

```
src/
├── app/                    # App Router: routes, layouts, special files
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing (SSG)
│   ├── error.tsx            # Error boundary
│   ├── not-found.tsx        # Global 404
│   ├── globals.css
│   ├── actions/             # Server Actions
│   │   └── auth.ts
│   ├── api/                 # Route Handlers (REST API)
│   │   └── forms/
│   ├── dashboard/
│   ├── forms/               # Route + colocated components
│   │   ├── page.tsx
│   │   ├── FormsList.tsx, FormsPageClient.tsx, FormsListSkeleton.tsx
│   │   ├── [id]/, new/
│   └── login/
├── components/              # Shared UI (Toaster, FormForm, AuthHydrate)
├── lib/                     # Business logic, API, schemas, store, types
└── stores/                  # Zustand (auth, toasts)
```

- **Colocation:** Route-specific components live in the route folder (`app/forms/`, `app/login/`).
- **Shared code:** `lib/` for auth, forms API, Zod schemas, store; `components/` for reusable UI.
- **Alias:** `@/*` → `src/*` in `tsconfig.json`.

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **Landing:** `/`
- **Login:** `/login` (email + role: Individual or Admin)
- **Forms list:** `/forms` (after login)
- **New form (Admin only):** `/forms/new`
- **Edit form (Admin only):** `/forms/[id]`
- **Dashboard:** `/dashboard`

## Decisions

- **Auth:** Simple cookie-based auth (no NextAuth). Cookie stores `{ email, role }`. Middleware protects `/dashboard` and `/forms/*`; unauthenticated users are redirected to `/login`.
- **Admin-only CRUD:** API `POST/PUT/DELETE` check `Admin` role via cookie; 401 when not authenticated, 403 when not Admin. Pages `/forms/new` and `/forms/[id]` redirect non-Admins to `/forms`.
- **Data:** **JSON file** `data/forms.json` for persistence (read/write). Seed with 3 forms; same store is used by API route handlers and server-side `getFormsList()`. On read-only environments (e.g. Vercel), writes fall back to in-memory for that process.
- **Forms list:** SSR via server component calling `getFormsList()` (same data source as API). Filter by status and sort by `updatedAt` (desc) via URL search params. Client component handles filter UI and navigation.
- **Validation:** Single Zod schema in `src/lib/schemas.ts` used by React Hook Form on the client and by API route handlers on the server.
- **Toasts:** Zustand store + `Toaster` component; toasts auto-dismiss after 4s.

## API

- `GET /api/forms` — list forms (query: `status`, `sort`, `order`)
- `GET /api/forms/:id` — get one form (404 if not found)
- `POST /api/forms` — create (Admin only; 401/403 otherwise)
- `PUT /api/forms/:id` — update (Admin only; 401/403/404)
- `DELETE /api/forms/:id` — delete (Admin only; 401/403/404)

**Persistence:** `data/forms.json` (created on first run if missing). On Vercel, filesystem is read-only so new data is in-memory only per instance.

## What’s done

- [x] Login & roles (`/login`), cookie + Zustand
- [x] Middleware protection for `/dashboard` and `/forms/*`
- [x] Forms list at `/forms` (SSR, table, sort by `updatedAt` desc, filter by status, skeleton, error state)
- [x] CRUD at `/forms/new` and `/forms/[id]` (Admin only, RHF + Zod, toasts, redirect to list on success)
- [x] Public landing at `/` (SSG, hero, `next/image`, CTA to `/login`, SEO / OG / Twitter metadata)
- [x] Route handlers for all API endpoints, 401/403/404, shared Zod validation
- [x] **JSON file persistence** (`data/forms.json`) with in-memory fallback
- [x] Clean responsive Tailwind UI, inline validation errors, basic a11y (focus, labels, aria)

## Task checklist (MVP)

| Requirement | Done |
|-------------|------|
| Next.js 15 App Router + TypeScript | ✓ |
| Tailwind CSS | ✓ |
| RHF + Zod (shared schema client/server) | ✓ |
| Zustand (toasts + auth state) | ✓ |
| Route Handlers as REST API | ✓ |
| Metadata + next/image | ✓ |
| Login: email + role (Individual/Admin), cookie + Zustand | ✓ |
| Middleware: protect /dashboard and /forms/* | ✓ |
| Forms list: SSR, table (title, status, updatedAt), sort updatedAt desc, filter by status | ✓ |
| Loading skeleton + error state | ✓ |
| CRUD: /forms/new, /forms/[id], Admin only | ✓ |
| Form fields: title (min 3), description, fieldsCount 0–50, status enum | ✓ |
| Zod + RHF, same schema on server | ✓ |
| POST/PUT/DELETE to route handlers, toast + redirect on success | ✓ |
| Public landing: SSG, hero, next/image, CTA to /login | ✓ |
| SEO: title, description, OpenGraph, Twitter Card | ✓ |
| GET /api/forms, GET /api/forms/:id, POST/PUT/DELETE (Admin) | ✓ |
| Persistence: in-memory or JSON — **JSON file** (`data/forms.json`) | ✓ |
| Clean Tailwind UI, inline validation, basic a11y | ✓ |

## Deliverables

- **Repo:** this GitHub repo
- **Deploy:** [Vercel deploy link] — add your link after deploying
- **Screenshots / Lighthouse:** add 1–2 screenshots and Lighthouse (Desktop) score (target Performance ≥ 90) after running locally or on Vercel

## Build

```bash
npm run build
npm start
```
