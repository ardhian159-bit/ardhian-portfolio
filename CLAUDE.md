# CLAUDE.md — Portfolio Landing Page

Personal job application landing page for Ardhian Caesar Hermawan.
Built with Next.js 16 App Router, Tailwind CSS v4, shadcn/ui, Framer Motion.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Font | Geist Sans + Geist Mono (next/font) |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/
├── CLAUDE.md
├── Ardhian_Caesar_CV.md          # Source of truth for all copy/data
│
├── app/
│   ├── layout.tsx                # Root layout, font setup, metadata
│   ├── page.tsx                  # Main landing page (entry point)
│   └── globals.css               # Tailwind base + CSS variables
│
├── components/
│   ├── ui/                       # shadcn/ui auto-generated components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   └── avatar.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx            # Sticky navbar + mobile drawer
│   │   └── Footer.tsx            # Minimal footer
│   │
│   └── sections/
│       ├── Hero.tsx              # Hero section
│       ├── StatsBar.tsx          # 4-stat highlight bar
│       ├── Projects.tsx          # 3 project cards
│       ├── Experience.tsx        # Timeline (jobs + education)
│       ├── Skills.tsx            # Skill pills + certifications
│       └── Contact.tsx           # CTA banner + contact info
│
├── lib/
│   ├── data.ts                   # All static copy (name, projects, jobs, skills)
│   ├── animations.ts             # Shared Framer Motion variants
│   └── utils.ts                  # shadcn cn() utility
│
├── public/
│   ├── cv.pdf                    # Downloadable CV (linked from Navbar)
│   └── og-image.png              # Open Graph image (1200x630)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Data Layer — `lib/data.ts`

Single source of truth. All sections read from here. No hardcoded copy in components.

```ts
export const profile = { ... }       // name, tagline, location, contacts
export const stats = [ ... ]         // StatsBar items
export const projects = [ ... ]      // Projects section cards
export const experience = [ ... ]    // Experience timeline entries
export const education = [ ... ]     // Education timeline entries
export const skills = { ... }        // Technical + business skill groups
export const certifications = [ ... ]
```

Reference file: `Ardhian_Caesar_CV.md`

---

## Animation Layer — `lib/animations.ts`

Shared variants imported by all section components. Do not inline variants in components.

```ts
export const fadeUp       // opacity 0→1, y 24→0, spring easing
export const fadeIn       // opacity 0→1 only
export const slideLeft    // x -24→0 (used in timeline)
export const stagger      // staggerChildren: 0.08
export const scaleIn      // scale 0.96→1 + opacity (used in CTA banner)
```

All scroll animations use:
```tsx
whileInView="visible"
initial="hidden"
viewport={{ once: true, margin: "-80px" }}
```

---

## Sections

### `Navbar.tsx`
- Sticky, `backdrop-blur-md bg-white/80`, border-bottom on scroll
- Links: About · Projects · Experience · Skills · Contact
- CTA: Download CV → `/cv.pdf`
- Mobile: hamburger → shadcn `Sheet` drawer
- Animation: fadeIn from top on mount

### `Hero.tsx`
- Badge → H1 (2 lines) → Subheadline → CTAs → Social links
- Ambient gradient blobs (indigo + sky, absolute positioned)
- Animation: stagger children on mount

### `StatsBar.tsx`
- 4 stats with label + value
- Thin band, bg-gray-50, border y
- Animation: fade on scroll

### `Projects.tsx`
- 3 cards: NSMS CRM · SIRUP Pipeline · Dapodik Analysis
- Each: title, company, description, stack badges, impact badge, links
- Animation: stagger cards on scroll

### `Experience.tsx`
- Vertical timeline, left border + dot per entry
- 3 jobs + 1 education entry (styled differently)
- Animation: slideLeft per entry on scroll

### `Skills.tsx`
- Two columns: Technical · Business & Domain
- Pill badges with Lucide icons
- Certifications row below
- Animation: stagger grid on scroll

### `Contact.tsx`
- Indigo gradient bg (only dark section)
- Headline + sub + 2 buttons (email + LinkedIn)
- Animation: scaleIn on scroll

### `Footer.tsx`
- Name + location | nav links | social icons
- "Built with Next.js & Framer Motion" muted text

---

## Routing & Metadata

Single-page app — all sections on `/`.
Scroll-spy navigation via anchor IDs: `#projects`, `#experience`, `#skills`, `#contact`.

`app/layout.tsx` metadata:
```ts
export const metadata: Metadata = {
  title: "Ardhian Caesar Hermawan — Data & Strategy",
  description: "Portfolio of Ardhian Caesar Hermawan...",
  openGraph: { images: ["/og-image.png"] }
}
```

---

## Conventions

- `"use client"` only in components that use Framer Motion or browser APIs
- Server Components by default (`layout.tsx`, `page.tsx`)
- All imports: named, no barrel files in `/components/sections/`
- shadcn imports: `@/components/ui/...`
- Lucide: individual named imports from `"lucide-react"`
- No `any` — TypeScript strict mode
- No lorem ipsum — all copy from `lib/data.ts`

---

## Commands

```bash
# Install dependencies
pnpm install

# Add shadcn components
pnpm dlx shadcn@latest add button badge card separator sheet avatar

# Dev server
pnpm dev

# Build
pnpm build

# Deploy
vercel --prod
```
