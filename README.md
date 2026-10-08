# MyBusinessOS

The website and inquiry backend for CustomSoftwarePro, a custom software services business. It presents CRM, ERP, automation, and AI integration work, then lets visitors send a project inquiry or request a consultation time.

## Inside the application

[The main page](src/app/page.tsx) uses hash-based navigation to switch between service views without leaving the page. The interface is built with Next.js 15, React 19, TypeScript, Tailwind CSS 3, and Framer Motion. Project images and a demo video are included under `public/`.

The backend is a set of Next.js route handlers:

| Route | Responsibility |
| --- | --- |
| `POST /api/contact` | Validate an inquiry, send it through Resend, and attempt to save a copy in Supabase |
| `POST /api/consultation` | Validate the requested time and contact details, then email the request |
| `POST /api/demo` | Store a demo request in Supabase |
| `POST /api/ai-chat` | Classify software requests and generate responses through OpenAI, with local fallback responses when no key is configured |

[The contact handler](src/app/api/contact/route.ts) treats email delivery as the main success condition. Database persistence runs separately on a best-effort basis. [The consultation picker](src/components/ContactOptions/Scheduler.tsx) collects a requested slot and the visitor's time zone; it does not check calendar availability or reserve a slot.

## Run locally

From the repository root, with Node.js and npm installed:

```sh
npm install
npm run dev
```

The committed lockfile is missing platform dependencies and fails a clean `npm ci` on Windows, so use `npm install` for now. Open `http://localhost:3000` to preview the site. To exercise the backend, create `.env.local` with the services you intend to use:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-project-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-server-service-role-key
RESEND_API_KEY=your-resend-key
RESEND_FROM_EMAIL=your-verified-sender@example.com
OPENAI_API_KEY=your-openai-key
```

[`supabase-schema.sql`](supabase-schema.sql) defines the database tables and policies. Contact email needs Resend configuration; demo persistence needs Supabase. The service role key is used by the server's contact-save fallback. OpenAI is optional for the chat route, which uses `gpt-3.5-turbo` when configured.

Before testing email, change `TO_EMAIL` in [`src/lib/email.ts`](src/lib/email.ts) to an inbox you control. The recipient is currently fixed in code. `NEXT_PUBLIC_SITE_URL` controls the site's metadata URL.

## Scope and checks

This repository contains the services website and its inquiry flows. The business systems shown in the portfolio are examples of the work being presented, not applications implemented by this repository.

Jest and React Testing Library tests are under [`src/__tests__/`](src/__tests__). Run them with `npm test`; `npm run test:coverage` requests coverage. The contact route's rate limiter is still a stub, and `next.config.js` skips TypeScript and ESLint errors during builds, so a successful build alone is not a code-quality check.
