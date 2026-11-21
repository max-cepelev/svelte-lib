# AGENTS.md

This repository contains `@max-ts/svelte`, a Svelte 5 component library. The
[README](README.md) documents the consumer API and stylesheet imports.

## Setup and development

- Run commands from the repository root using the pnpm version pinned in
  `package.json`. Use `pnpm install --frozen-lockfile` for a fresh checkout.
- `pnpm run storybook` serves the component stories on port 6006.
- `pnpm run dev` rebuilds the library in watch mode; it does not serve a page.
- `pnpm run play` starts the Vite dev server.
- `pnpm run build` packages `src/lib/` into `dist/` with `@sveltejs/package`.

## Where to make changes

- Library components live in `src/lib/components/`. Stories live in
  `src/stories/` and are not packaged.
- Export new public components and their public types from the component's
  `index.ts`, then from `src/lib/components/index.ts`. The root
  `src/lib/index.ts` re-exports that barrel.

## Component conventions

- Follow the surrounding Svelte 5 runes and TypeScript patterns. Preserve public
  props and types, `data-slot` attributes, and caller-provided `class` values.
  Keep browser-only APIs out of code paths that run during SSR.
- Keep component CSS in its `.svelte` file inside
  `@layer max-ts-svelte-components` so caller styles can override it. Use short
  scoped classes for the component's own markup and targeted `:global`
  selectors, typically keyed by `data-slot`, for markup rendered by Bits UI,
  another component, or a snippet. Keep variant styling local; do not export
  class maps.
- Preserve the CSS custom property names in `src/lib/theme.css`. Keep
  `src/lib/theme.ts` in sync: it exports `theme` as `var(...)` references and
  the `Theme` and `SpacingKey` types. `reset.css` is optional; the compatibility
  entry point `styles.css` imports both the theme and the reset.

## Checks

- `pnpm test --run` runs the non-browser Vitest suite once. Append a file
  filter to run a focused test, for example `pnpm test --run ssr.test.ts`.
- `pnpm run test:browser` runs `*.browser.test.ts` with Playwright. Use it for
  browser behavior such as focus, keyboard interaction, and CSS overrides.
  The default is Google Chrome; set `SVELTE_LIB_BROWSER_EXECUTABLE` to use a
  different Chromium executable.
- `pnpm run lint:types` checks Svelte and TypeScript. Run
  `pnpm exec biome check <paths>` to check selected files without editing them.
  Both `pnpm run lint` and `pnpm run lint:code` invoke Biome with `--write`.
- Run `pnpm run build` when changing public exports or packaging.
