# WARP.md

This repository contains `@max-ts/svelte`, a Svelte 5 component library.

## Commands

- `pnpm dev` packages `src/lib` in watch mode.
- `pnpm play` starts the Vite playground.
- `pnpm storybook` starts Storybook on port 6006.
- `pnpm test` runs Vitest.
- `pnpm lint` runs Svelte type checks and Biome.
- `pnpm build` packages the library with `@sveltejs/package`.

## Structure

Public library source lives in `src/lib`:

```text
src/lib/
├── index.ts
├── components/
├── theme.ts
├── theme.css
├── reset.css
├── styles.css
└── utils.ts
```

Stories live in `src/stories` and are not packaged.

Each component keeps its CSS in a `<style>` block with short scoped classes. Variants are selected inside the component without adjacent class-map files. Use targeted `:global(...)` selectors only to reach DOM owned by Bits UI, other components or user snippets. Preserve the original theme variable names; CSS classes are implementation details and are not exported.

Theme values use the stable CSS custom properties declared in `src/lib/theme.css`. `src/lib/theme.ts` exports a `theme` object containing their `var(...)` references together with `Theme = typeof theme` and `SpacingKey`. `reset.css` is optional. `styles.css` remains as a compatibility entry point that imports both the default theme and reset.

New components must be exported from their component `index.ts`, `src/lib/components/index.ts`, and `src/lib/index.ts`. Preserve `data-slot`, user-provided `class`, Svelte 5 runes conventions and public prop types.
