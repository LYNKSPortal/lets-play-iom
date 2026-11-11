# Let's Play — Football Development Centre

Website for Let's Play, a children's football development centre on the Isle
of Man. Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Tech stack

- **Next.js 16** (App Router, Server Components by default)
- **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens for the black/gold brand palette
- **shadcn-style UI primitives** (Radix UI + class-variance-authority)
- **Lucide React** icons
- **Motion** (Framer Motion successor) for scroll reveals, respecting
  `prefers-reduced-motion`
- **React Hook Form + Zod** for client and server-side form validation

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs fully
locally without any AWS infrastructure — booking and contact-form backends
run in a clearly labelled **demo mode** until configured (see below).

## Project structure

```
src/
  app/                 Routes (App Router), API routes, sitemap/robots
  components/
    layout/            Header, mobile nav, announcement bar, footer
    home/               Homepage sections
    programmes/         Programme card + detail content
    camps/              Camp card
    booking/            Multi-step booking form + stepper
    registration/       Multi-step programme registration form + stepper
    forms/              Contact form
    ui/                 Shared primitives (button, badge, accordion, stepper, etc.)
    seo/                JSON-LD structured data
  lib/
    data/               Seed content: programmes, camps, coaches, FAQs
    validation/         Zod schemas (contact, booking, registration)
    api/                Server-side submission logic (booking, contact, registration)
    utils.ts            Formatting helpers
  types/                Shared TypeScript types
  config/               Site-wide config (nav, sponsor, feature flags)
```

Content (programmes, camps, coaches, sponsor, FAQs) is kept in typed data
files under `src/lib/data/`, separate from presentation — swap these for API
calls to a real backend without touching components.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as backends are
connected. The site works locally with none of these set:

| Variable | Purpose |
| --- | --- |
| `BOOKING_API_URL` / `BOOKING_API_KEY` | Secure AWS-hosted booking API (API Gateway + Lambda, DynamoDB/PostgreSQL). Unset = demo mode. |
| `NEXT_PUBLIC_BOOKING_API_URL` | Mirrors booking backend status to the client UI. |
| `REGISTRATION_API_URL` / `REGISTRATION_API_KEY` | Secure AWS-hosted programme registration API. Unset = demo mode. |
| `NEXT_PUBLIC_REGISTRATION_API_URL` | Mirrors registration backend status to the client UI. |
| `CONTACT_FORM_PROVIDER` + credentials | Email delivery provider for the contact form. Unset = form clearly tells users to email/call directly instead of faking success. |
| `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Reserved for future AWS-backed services (file storage, etc). |

**Never commit `.env.local` or real secrets.**

## What's demo-only vs production-ready

- **Production-ready now:** all routes/pages, navigation, responsive layout,
  content data model, SEO metadata/sitemap/robots, accessibility structure,
  client + server-side form validation, rate limiting on API routes.
- **Demo-only until backend is connected:**
  - **Booking flow** (`/book/[campId]`): fully built UI and server route,
    but with no `BOOKING_API_URL` configured it returns a clearly labelled
    demo reference and never claims a real reservation was made. No payment
    provider is integrated.
  - **Programme registration** (`/register/[programmeId]`): fully built
    multi-step UI and server route (parent/child details, medical info,
    liability/photo/WhatsApp consent, standing order payment agreement),
    but with no `REGISTRATION_API_URL` configured it returns a clearly
    labelled demo reference and never claims a real registration was made.
    Standing order bank details are shown for the parent to set up
    themselves; no card payment provider is integrated. The "Register Now"
    CTA only appears on a programme page once that programme's `status` is
    set to something other than `fully-booked` in `src/lib/data/programmes.ts`.
  - **Contact form**: validates and rate-limits submissions server-side, but
    without `CONTACT_FORM_PROVIDER` configured it tells the user the form is
    unavailable and shows direct email/phone alternatives rather than a false
    success message.
- **Legal pages** (`/privacy`, `/terms`, `/safeguarding`) and programme
  pricing/payment terms reflect content reviewed and approved by Let's Play.

## Build & verification commands

```bash
npm run lint        # ESLint
npx tsc --noEmit    # Type-check
npm run build        # Production build
npm start            # Serve the production build locally
```

## Deployment

- **Frontend:** deploy to Vercel (`vercel.com/new`), connecting this
  repository. Set the environment variables above in the Vercel project
  settings for any backends you've connected.
- **Backend (future):** booking and storage are designed to be backed by
  AWS (API Gateway + Lambda, DynamoDB/PostgreSQL, S3). None of this is
  required to preview or deploy the frontend.

## Brand assets

Logo and photography are sourced from the existing
[letsplay.co.im](https://letsplay.co.im) site with permission implied by
continuity of the brand refresh. Replace `public/images/*` with updated
assets as they become available — components fall back to an on-brand
placeholder (`PlaceholderImage`) when an image is missing.
