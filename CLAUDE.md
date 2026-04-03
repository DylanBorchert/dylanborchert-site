# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `yarn dev` — Start Next.js dev server
- `yarn build` — Production build
- `yarn lint` — Run ESLint
- `yarn generate:types` — Regenerate Payload CMS types (`src/payload/payload-types.ts`)

## Architecture

This is a **Next.js 15 portfolio site** (dylanborchert.ca) using **Payload CMS 3** as a headless CMS with **PostgreSQL**, all running in the same Next.js app.

### Route Groups

- `src/app/(app)/` — Public-facing site (homepage, blogs, projects)
- `src/app/(payload)/` — Payload admin panel and API routes (GraphQL, REST, custom endpoints)

### Payload CMS

- Config: `src/payload/payload.config.ts`
- Collections: Users, Media, Blogs, Projects, Experience, Tags
- Globals: Home (controls homepage content)
- DB: PostgreSQL via `@payloadcms/db-postgres`
- Media storage: S3-compatible (MinIO) via `@payloadcms/storage-s3`
- Email: Resend adapter
- Rich text: Lexical editor with custom CodeBlock

### Data Fetching

- `src/utils/cms.server.ts` — CMS utility singleton that wraps `getPayload()` for server-side data access (used for Home global, Experience collection)
- Blog/project pages query Payload directly via `getPayload({ config })` in server components

### Component Conventions

- `src/components/ui/` — shadcn/ui components (new-york style) + Aceternity UI components
- `src/components/custom/` — App-specific components, organized by page section (e.g., `Home/Hero/`, `Home/About/`, `Post/`)
- Compound component pattern used for Hero and Post (e.g., `<Hero.Header />`, `<Post.Content />`)
- File naming: `.server.tsx` for server components, `.client.tsx` for client components

### Path Aliases

- `#/*` and `@/*` both map to `./src/*`
- `@payload-config` maps to `./src/payload/payload.config.ts`

### Styling

- Tailwind CSS v4 with `darkMode: "class"` (toggled via `next-themes`)
- Font: Space Grotesk (Google Fonts)
- Framer Motion / Motion for animations

### Contexts

- `ContactSheet.context.tsx` — Contact sheet dialog state
- `ColorPalette.context.tsx` — Dynamic color palette (extracted from images via node-vibrant)
