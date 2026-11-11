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
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com). All form submissions (contact, camp booking, programme registration) are delivered as a notification email via Resend. Unset = demo mode on all three forms. |
| `RESEND_FROM_EMAIL` | Sender address, e.g. `Let's Play <no-reply@letsplay.co.im>`. Must be on a domain verified in Resend (see below). |
| `RESEND_TO_EMAIL` | Inbox that receives submissions. Defaults to `info@letsplay.co.im`. |
| `NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED` | Set to `true` once `RESEND_API_KEY` is configured, so forms show real (not demo) confirmation messaging. |
| `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Reserved for a future capacity-checked booking/registration database backend; not required for the email-based flow above. |

**Never commit `.env.local` or real secrets.**

### Setting up Resend

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. **Verify a sending domain** at [resend.com/domains](https://resend.com/domains)
   (e.g. `letsplay.co.im`) by adding the DNS records Resend provides. Until a
   domain is verified, Resend's sandbox mode only delivers to the email
   address the Resend account itself is registered under, no other
   recipient (including `info@letsplay.co.im`) will receive mail.
3. Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (using the verified domain),
   `RESEND_TO_EMAIL`, and `NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED=true` in
   `.env.local` (and in your Vercel project's environment variables for
   production).

## What's demo-only vs production-ready

- **Production-ready now:** all routes/pages, navigation, responsive layout,
  content data model, SEO metadata/sitemap/robots, accessibility structure,
  client + server-side form validation, rate limiting on API routes, and
  email delivery for all three forms once Resend is configured (see above).
- **Demo-only until Resend is configured:**
  - **Contact form**, **camp booking** (`/book/[campId]`), and **programme
    registration** (`/register/[programmeId]`, `/join/[programmeId]`) are
    fully built end-to-end, but without `RESEND_API_KEY` (and
    `NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED=true`) they return a clearly
    labelled demo reference and never claim a real submission was sent.
  - Camp bookings and programme registrations are notified by email, not
    persisted to a database, there's no automated capacity check, so staff
    confirm manually. No card payment provider is integrated; standing
    order bank details are shown for the parent to set up themselves.
  - The "Register Now" CTA only appears on a programme page once that
    programme's `status` is set to something other than `fully-booked` in
    `src/lib/data/programmes.ts`. The unlisted `/join/[programmeId]` links
    bypass that status check entirely for direct sign-ups.
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
