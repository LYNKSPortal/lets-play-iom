# Let's Play — Football Development Centre

Website for Let's Play, a children's football development centre on the Isle
of Man. Next.js (App Router), React, TypeScript, Tailwind CSS.

## Stack

- Next.js 16 (App Router, Server Components by default)
- TypeScript (strict)
- Tailwind CSS v4
- Radix UI primitives + class-variance-authority
- React Hook Form + Zod (client and server-side validation on every form)
- Resend (transactional email for all form submissions)

## Setup

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without `.env.local`
configured, forms run in a clearly labelled demo mode and never claim a
submission was sent.

## Project structure

```
src/
  app/            Routes, API routes, sitemap.xml, robots.txt
  components/
    layout/       Header, mobile nav, footer
    home/         Homepage sections
    programmes/   Programme card + detail content
    camps/        Camp card
    booking/      Camp booking form + stepper
    registration/ Programme registration form + stepper
    forms/        Contact form
    ui/           Shared primitives
    seo/          JSON-LD structured data
  lib/
    data/         Typed content: programmes, camps, coaches, FAQs
    validation/   Zod schemas
    api/          Server-side submission logic
    email.ts      Resend wrapper
  types/          Shared TypeScript types
  config/         Site-wide config (nav, sponsor, feature flags)
```

Content lives in typed files under `src/lib/data/`, separate from
presentation. Swap these for real API calls without touching components.

## Environment variables

Copy `.env.example` to `.env.local` and set real values. **Never commit
`.env.local`** — it's git-ignored, and `.env.example` must stay free of real
secrets.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only. All form submissions (contact, booking, registration) send a notification email via Resend. Unset = demo mode. |
| `RESEND_FROM_EMAIL` | Sender address. Must be on a domain verified in Resend. |
| `RESEND_TO_EMAIL` | Inbox that receives submissions. |
| `NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED` | Set to `true` once `RESEND_API_KEY` is configured, to switch forms out of demo mode. Public (client-visible) by design — holds no secret. |
| `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | Reserved for a future database-backed booking system. Not required today. |

Setting up Resend: create a key at resend.com/api-keys, verify a sending
domain at resend.com/domains (sandbox mode only delivers to the account
owner's own address until a domain is verified), then set all four
`RESEND_*`/`NEXT_PUBLIC_EMAIL_NOTIFICATIONS_ENABLED` variables locally and in
your hosting provider's environment settings.

## Security notes

- API routes (`/api/bookings`, `/api/contact`, `/api/registrations`) validate
  input with Zod and are rate-limited per IP.
- Medical/child welfare information submitted through forms is emailed to
  the configured inbox only — it is never written to application logs.
- `RESEND_API_KEY` and any future AWS credentials are server-only and must
  never be referenced from client components or exposed via
  `NEXT_PUBLIC_*` variables.
- `/join/[programmeId]` links are unlisted (not in navigation or the
  sitemap, disallowed in `robots.txt`) but are not access-controlled —
  treat the URLs themselves as the access control and avoid posting them
  publicly.
- Legal/liability content on `/privacy`, `/terms`, and `/safeguarding`
  reflects values provided directly by Let's Play.

## What's demo-only vs. live

Contact, camp booking, and programme registration forms are fully built
end-to-end and send real email via Resend once the variables above are
configured. Without them, each returns a labelled demo reference instead.

Camp bookings and registrations are delivered by email, not persisted to a
database — there is no automated capacity check, so staff confirm manually.
No card payment provider is integrated; standing order bank details are
shown for the parent to set up themselves. The "Register Now" CTA only
appears on a programme page once its `status` in
`src/lib/data/programmes.ts` is not `fully-booked`; `/join/[programmeId]`
bypasses that check for direct sign-up links.

## Build & verification

```bash
npm run lint        # ESLint
npx tsc --noEmit    # Type-check
npm run build        # Production build
npm start            # Serve the production build locally
```

## Deployment

Frontend deploys to Vercel. Set the environment variables above in the
Vercel project settings for any environment that should send real email.
A future database-backed booking/registration service is designed to run
on AWS (API Gateway + Lambda, DynamoDB/PostgreSQL) but is not required to
deploy the frontend.
