# ESGC E-Gaming App

React 19 + Vite frontend for the Enugu State Gaming Commission licensing platform.

## Stack

- Vite
- React 19
- TypeScript, incrementally adopted with `allowJs`
- MUI v7
- Tailwind CSS v3
- Vitest, React Testing Library, MSW
- SWR data fetching

## Setup

```bash
npm ci
```

Copy or configure the required `VITE_*` environment variables before running a production build. Client-exposed variables are documented in `prompts/v1/artifacts/vite-public-env.md`.

## Scripts

```bash
npm run dev
```

Starts the Vite dev server.

```bash
npm run build
```

Builds production assets into `build/`.

```bash
npm run preview
```

Serves the production build locally through Vite preview.

```bash
npm run test -- --run
```

Runs the Vitest suite.

```bash
npm run typecheck
```

Runs the general mixed JS/TS TypeScript check.

```bash
npm run typecheck:strict
```

Runs strict TypeScript checks for the typed foundation subset.

```bash
npm run lint
```

Runs flat ESLint, including React, hooks, import, TypeScript, and jsx-a11y rules.

```bash
npm run build:check
```

Checks the current Vite build output against bundle-size budgets. Run `npm run build` first.

## Documentation

- `docs/theming.md`
- `docs/primitives.md`
- `docs/routing.md`
- `docs/data-and-forms.md`
- `docs/react19-mui7-upgrade.md`
- `docs/visual-parity.md`

## Release Gates

Before release, run:

```bash
npm run typecheck
npm run typecheck:strict
npm run lint
npm run test -- --run
npm run build
npm run build:check
```

Manual light/dark visual parity checks are still required. Baseline screenshots and release artifacts live under `prompts/v1/artifacts/`.
