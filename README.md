# React Router + Cloudflare Workers Starter Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/react-router-starter-template)

![React Router Starter Template Preview](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/bfdc2f85-e5c9-4c92-128b-3a6711249800/public)

<!-- dash-content-start -->

A modern, production-ready template for building full-stack React applications using [React Router v7](https://reactrouter.com/) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/). It ships with server-side rendering, TypeScript, and Tailwind CSS wired up so you can focus on shipping features instead of wiring up infrastructure.

## Features

- 🚀 Server-side rendering on Cloudflare Workers
- ⚡️ Hot Module Replacement (HMR) via Vite
- 📦 Asset bundling and optimization
- 🔄 Route-level data loading and mutations
- 🔒 TypeScript by default, with typed Cloudflare bindings
- 🎉 Tailwind CSS v4 preconfigured for styling
- 📖 First-class [React Router v7](https://reactrouter.com/) integration
- 🔎 Built-in [Workers Observability](https://developers.cloudflare.com/workers/observability/) for production monitoring
<!-- dash-content-end -->

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Cloudflare Bindings & Typegen](#cloudflare-bindings--typegen)
- [Building for Production](#building-for-production)
- [Previewing the Production Build](#previewing-the-production-build)
- [Deployment](#deployment)
- [Styling](#styling)
- [Adding Routes](#adding-routes)
- [Contributing](#contributing)
- [Resources](#resources)

## Quick Start

The fastest way to scaffold a new project from this template is via [C3](https://developers.cloudflare.com/pages/get-started/c3/) (the `create-cloudflare` CLI):

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/react-router-starter-template
```

A live public deployment of this template is available at [react-router-starter-template.templates.workers.dev](https://react-router-starter-template.templates.workers.dev).

## Prerequisites

- [Node.js](https://nodejs.org/) **v20 or later** (required by Vite 6 and Wrangler 4).
- [npm](https://www.npmjs.com/) v10+ (bundled with Node.js). You can substitute `pnpm` or `yarn` if you prefer.
- A free [Cloudflare account](https://dash.cloudflare.com/sign-up) (only needed for deployment).

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/rdrdrd-gif/react-router-starter-template.git
cd react-router-starter-template
npm install
```

## Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173). The Cloudflare Vite plugin runs your Worker in a local Workerd runtime, so `env` bindings behave just like they do in production.

## Project Structure

```text
.
├── app/                      # React Router application code
│   ├── root.tsx              # Root layout + global error boundary
│   ├── routes.ts             # Route manifest (file-based route config)
│   ├── routes/               # Route modules (loaders, actions, components)
│   │   └── home.tsx
│   ├── welcome/              # Default welcome screen component and assets
│   └── app.css               # Global styles (Tailwind entry)
├── workers/
│   └── app.ts                # Cloudflare Worker entry that handles SSR requests
├── public/                   # Static assets served as-is
├── react-router.config.ts    # React Router framework configuration
├── vite.config.ts            # Vite + React Router + Cloudflare + Tailwind plugins
├── wrangler.json             # Cloudflare Workers configuration (bindings, vars, etc.)
├── worker-configuration.d.ts # Generated types for your Worker `Env`
└── tsconfig*.json            # TypeScript project references
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR at `http://localhost:5173`. |
| `npm run build` | Create a production build in `build/`. |
| `npm run preview` | Build, then preview the production bundle locally. |
| `npm run deploy` | Deploy the Worker to Cloudflare via Wrangler. |
| `npm run cf-typegen` | Regenerate `worker-configuration.d.ts` and React Router types from `wrangler.json`. |
| `npm run typecheck` | Run the full TypeScript project-reference typecheck. |
| `npm run check` | CI-style check: `tsc`, build, and a Wrangler dry-run deploy. |

## Cloudflare Bindings & Typegen

This template uses the Cloudflare Vite plugin, so Worker bindings defined in `wrangler.json` (KV, D1, R2, queues, secrets, vars, etc.) are available on `context.cloudflare.env` inside loaders and actions.

The default `wrangler.json` includes an example `VALUE_FROM_CLOUDFLARE` variable that is read in `app/routes/home.tsx`:

```ts
export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}
```

Whenever you add or change bindings in `wrangler.json`, regenerate types so `Env` stays accurate:

```bash
npm run cf-typegen
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally (runs `build` first):

```bash
npm run preview
```

## Deployment

If you don't have a Cloudflare account, [create one here](https://dash.cloudflare.com/sign-up). Go to your [Workers dashboard](https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fworkers-and-pages) to see your [free custom Cloudflare Workers subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) on `*.workers.dev`.

Build the app:

```sh
npm run build
```

Deploy it:

```sh
npm run deploy
```

### Preview (versioned) deployments

Upload a new version without promoting it to production:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification, or roll it out progressively:

```sh
npx wrangler versions deploy
```

See the [Wrangler versions documentation](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/) for more.

## Styling

This template comes with [Tailwind CSS v4](https://tailwindcss.com/) already configured via the official [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/framework-guides/vite) plugin. Global styles live in `app/app.css`. You can swap Tailwind out for whichever CSS framework you prefer by removing the plugin from `vite.config.ts` and updating `app/app.css`.

## Adding Routes

Routes are declared in `app/routes.ts` using React Router's [route config](https://reactrouter.com/start/framework/routing) helpers. For example, to add an `/about` page:

```ts
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
```

Then create `app/routes/about.tsx` exporting a default component (plus optional `loader`, `action`, `meta`, or `ErrorBoundary`). Route-specific types are generated into `./+types/<route>` and can be imported as `import type { Route } from "./+types/about"`.

## Contributing

Contributions are welcome — whether that's bug reports, docs fixes, or new features. Please follow the workflow below to keep things smooth.

### Reporting issues

Before opening a new issue, search [existing issues](https://github.com/rdrdrd-gif/react-router-starter-template/issues) to avoid duplicates. When filing a bug, include:

- A clear description of the problem and expected behavior.
- Steps to reproduce (a minimal repo or code snippet is ideal).
- Your Node.js version and operating system.
- Relevant logs or screenshots.

### Development workflow

1. **Fork** the repository and clone your fork locally.
2. **Create a branch** off `main` using a descriptive name:
   ```bash
   git checkout -b feat/short-description
   # or
   git checkout -b fix/short-description
   ```
3. **Install dependencies** with `npm install`.
4. **Make your changes.** Keep them focused — one concern per PR.
5. **Verify locally** before pushing:
   ```bash
   npm run typecheck
   npm run check
   ```
6. **Commit** using clear, imperative messages (e.g. `fix: handle missing env var in loader`). We recommend following [Conventional Commits](https://www.conventionalcommits.org/) but it is not strictly required.
7. **Push** your branch and open a pull request against `main`.

### Pull request guidelines

- Give the PR a descriptive title and fill in the description with:
  - What changed and why.
  - How to test or verify the change.
  - Any screenshots or recordings for UI changes.
- Link any related issues (e.g. `Closes #123`).
- Keep PRs small and focused. Large refactors are easier to review when split into logical commits.
- Ensure `npm run check` passes locally before requesting review.
- Be responsive to review feedback — most PRs go through at least one round of comments.

### Code style

- **TypeScript everywhere.** Avoid `any`; prefer precise types. The repo uses `tsc -b` with project references, so keep type errors at zero.
- **Formatting.** The codebase uses tabs for indentation and double quotes in TypeScript/TSX files. Match the style of the surrounding code.
- **Imports.** Keep imports at the top of the file and group them by source (framework, third-party, local).
- **Component conventions.** Follow the existing structure in `app/routes/` and `app/welcome/` — colocate route components with their types and styles where possible.
- **Tests.** This template does not yet ship with a test runner; if you add one (e.g. Vitest), include example tests and wire it into `npm run check`.

## Resources

- [React Router docs](https://reactrouter.com/)
- [Cloudflare Vite plugin docs](https://developers.cloudflare.com/workers/vite-plugin/)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI docs](https://developers.cloudflare.com/workers/wrangler/)
- [Tailwind CSS docs](https://tailwindcss.com/docs)

---

Built with ❤️ using React Router and Cloudflare Workers.
