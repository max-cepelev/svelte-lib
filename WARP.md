# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is `@max-ts/svelte`, a Svelte 5 component library built with TypeScript. The library provides reusable UI components with a comprehensive theming system based on Vanilla Extract CSS-in-JS.

## Key Commands

### Development
- `pnpm dev` - Watch mode compilation with tsdown
- `pnpm play` - Run Vite development server for component playground
- `pnpm storybook` - Run Storybook development server on port 6006

### Building & Testing
- `pnpm build` - Build the library using tsdown bundler
- `pnpm test` - Run Vitest test suite  
- `pnpm typecheck` - Type checking with svelte-check

### Release & Publishing
- `pnpm release` - Bump version with bumpp and publish to npm
- Uses Changesets for version management and changelog generation

## Architecture

### Build System
- **tsdown**: Custom bundler that handles Svelte components and TypeScript compilation
- **Vanilla Extract**: CSS-in-JS for type-safe styling with theme contracts
- **Custom Plugin**: `scripts/tsdown-plugin-svelte-dts.js` generates TypeScript declarations for Svelte components

### Component Structure
Each component follows this pattern:
```
Component/
├── index.ts          # Exports component, types, and styles
├── Component.svelte  # Main component implementation
├── types.ts         # TypeScript type definitions
└── styles.css.ts    # Vanilla Extract styles
```

### Theming System
- Global theme contract defined in `src/styles/theme.css.ts`
- Uses OKLCH color space for consistent color definitions
- Provides design tokens for colors, spacing, typography, shadows, and borders
- Theme accessible via `~/styles` path alias

### Path Aliases
- `~/components/*` → `src/components/*`
- `~/styles/*` → `src/styles/*`

## Component Development

### Creating New Components
1. Create component directory under `src/components/`
2. Follow the established file structure pattern
3. Export from component's `index.ts`
4. Add export to `src/components/index.ts`
5. Create Storybook story in `src/stories/`

### Directory Structure for Components
For simple components with no subcomponents:
```
Component/
├── index.ts              # Export default component and types
├── Component.svelte      # Main component implementation
├── types.ts             # TypeScript type definitions
└── styles.css.ts        # Vanilla Extract styles
```
For compound components with subcomponents (e.g., Alert, Accordion):
```
Component/
├── index.ts              # Export Root and subcomponents
├── Component.svelte      # Root component
├── types.ts             # Shared type definitions
├── styles.css.ts        # Root component styles and global styles
├── SubComponent1/
│   ├── index.ts
│   ├── SubComponent1.svelte
│   └── styles.css.ts    # Subcomponent-specific styles
└── SubComponent2/
    ├── index.ts
    ├── SubComponent2.svelte
    └── styles.css.ts
```

### Component Implementation Pattern
Component props (`types.ts`):
- Define public variants and sizes as unions, e.g. `export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info'`.

Root component (`Component.svelte`):
- Import types and styles: `import { styleOrVariants } from './styles.css.js'` and the public types from `./types.js`.
- Use `$props()` with `WithElementRef` from `@vanilla-extract/css` to support `bind:this`.
- Apply classes via array syntax: `class={[styles.something, className]}` or for variants `class={[variants[variant], className]}`.
- Set a `data-slot` attribute, e.g. `data-slot="alert"`.

Exports (`index.ts`):
- Simple components: `export { default as Button } from './Button.svelte'; export { buttonVariants } from './styles.css.js'; export type * from './types.js';`
- Compound components: export object with Root and subcomponents, plus style variants: `export { Alert, alertVariants }`.

### Styling Guidelines (Vanilla Extract)
In each `styles.css.ts`:
- Import from `@vanilla-extract/css`: `style`, `styleVariants`, `globalStyle` and from `~/styles/theme.css.js`: `theme`.
- Create a base style with `style({ ... })`.
- Create variants with `styleVariants<Record<VariantUnion, ComplexStyleRule>>({...})`.
- Use `globalStyle` to target child nodes (e.g., `${parent} > svg`), not `selectors` with `& child`.
- Reference tokens only from `theme` (colors, spacing, fontSize, fontWeight, lineHeight, borderRadius, shadow, elevation).
- Import styles in Svelte as `.js`: `import styles from './styles.css.js'`.

Subcomponents:
- Each subcomponent directory contains its own `styles.css.ts` and imports it locally in the Svelte file.
- Root-level styles file should only contain root styles and shared variants; subcomponents must not rely on root selectors.

### Using Theme Tokens
- Colors: `theme.colors.[primary|secondary|error|success|warning|info|text.primary|text.secondary|border|background.paper|...]`
- Spacing: `theme.spacing[1|2|3|4|5|6|7|8|9|10|12|16|20]`
- Typography: `theme.fontSize.*`, `theme.fontWeight.*`, `theme.lineHeight.*`
- Radius: `theme.borderRadius.[sm|md|lg]`
- Effects: `theme.shadow.*`, `theme.elevation.*`

Example:
```ts
import { style } from '@vanilla-extract/css';
import { theme } from '~/styles/theme.css.js';

export const container = style({
  padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
  backgroundColor: theme.colors.background.paper,
  color: theme.colors.text.primary,
  borderRadius: theme.borderRadius.md,
});
```

## Dependencies

### Core
- **Svelte 5**: Component framework with new runes syntax
- **bits-ui**: Headless UI primitives foundation
- **@lucide/svelte**: Icon library

### Build Tools
- **Biome**: Fast linting and formatting (tab indentation, single quotes)
- **Vanilla Extract**: Type-safe CSS-in-JS with build-time extraction
- **pnpm**: Package manager with lock file