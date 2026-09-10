# @max-ts/svelte

Svelte 5 component library with SSR-compatible native component styles.

## Installation

```bash
pnpm add @max-ts/svelte
```

Import the default theme once in the application entry point:

```ts
import '@max-ts/svelte/theme.css';
```

The reset is optional:

```ts
import '@max-ts/svelte/reset.css';
```

The legacy entry point imports both files:

```ts
import '@max-ts/svelte/styles.css';
```

Component styles live in each `.svelte` file and are included by the consumer's Svelte compiler.

## Components

```svelte
<script lang="ts">
  import { Button } from '@max-ts/svelte';
</script>

<Button variant="outline">Save</Button>
```

## Theme contract

The theme preserves the original CSS custom property names, including `--colors-primary`, `--spacing-4` and `--fontSize-sm`. Override tokens globally or on a DOM subtree:

```css
:root {
  --colors-primary: oklch(0.55 0.2 260);
  --radius-medium: 0.75rem;
}

[data-theme='dark'] {
  --colors-background-paper: oklch(0.18 0.02 264);
  --colors-text-primary: oklch(0.95 0 0);
}
```

The TypeScript entry point exports the CSS variable references as a `theme`
object. Its `Theme` type is inferred directly from that object with
`typeof theme`:

```ts
import { style } from '@vanilla-extract/css';
import { theme, type Theme } from '@max-ts/svelte/theme';

const tokens: Theme = theme;

export const card = style({
	color: tokens.colors.text.primary,
	padding: tokens.spacing[4],
	borderRadius: tokens.radius.medium,
});
```

For themes applied to a local subtree, content portalled to `document.body` does not inherit that subtree's variables. Apply an application-wide theme to `:root`, or pass a portal target inside the themed subtree where the component API supports it.

For CSS variable completion in Svelte files, add this workspace setting:

```json
{
  "svelte.plugin.css.globals": "node_modules/@max-ts/svelte/dist/theme.css,src/app.css"
}
```

## Development

Component styles use short local classes scoped by Svelte. Selectors crossing into Bits UI components or user snippets use targeted `:global(...)` selectors. CSS classes are implementation details; use component props and the theme variables for customization. The former class-map exports (`buttonVariants`, `badgeVariants`, `alertVariants`, `spinnerSizes`, `addonAlignVariants` and `inputGroupButtonSizes`) have been removed.

```bash
pnpm run storybook
pnpm run test
pnpm run lint
pnpm run build
```
