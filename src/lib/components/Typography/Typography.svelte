<script lang="ts">
import type {
  ComponentVariant,
  TypographyProps,
  TypographyVariant,
} from './types';

let {
  ref = $bindable(null),
  align = 'left',
  class: className,
  children,
  color = 'primary',
  component: Component,
  decoration = 'none',
  display = 'inline',
  gutterBottom,
  transform,
  variant = 'body1',
  weight = 'normal',
  ...restProps
}: TypographyProps = $props();

const VARIANT_COMPONENT_MAP: Record<
  NonNullable<TypographyVariant>,
  ComponentVariant
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

const TagComponent = $derived(Component || VARIANT_COMPONENT_MAP[variant]);
</script>

<svelte:element
  this={TagComponent}
  bind:this={ref}
  {...restProps}
  class={['typography', className]}
  data-align={align}
  data-color={color}
  data-decoration={decoration}
  data-display={display}
  data-gutter-bottom={gutterBottom || undefined}
  data-transform={transform}
  data-variant={variant}
  data-weight={weight}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
@layer max-ts-svelte-components {
  .typography {
    &[data-variant="h1"] {
      font-size: var(--fontSize-4xl);
      font-weight: var(--fontWeight-bold);
      line-height: var(--lineHeight-tight);
      letter-spacing: -0.025em;
    }
    &[data-variant="h2"] {
      font-size: var(--fontSize-3xl);
      font-weight: var(--fontWeight-bold);
      line-height: var(--lineHeight-tight);
      letter-spacing: -0.025em;
    }
    &[data-variant="h3"] {
      font-size: var(--fontSize-2xl);
      font-weight: var(--fontWeight-bold);
      line-height: var(--lineHeight-snug);
      letter-spacing: -0.025em;
    }
    &[data-variant="h4"] {
      font-size: var(--fontSize-xl);
      font-weight: var(--fontWeight-semibold);
      line-height: var(--lineHeight-snug);
    }
    &[data-variant="h5"] {
      font-size: var(--fontSize-lg);
      font-weight: var(--fontWeight-semibold);
      line-height: var(--lineHeight-normal);
    }
    &[data-variant="h6"] {
      font-size: var(--fontSize-base);
      font-weight: var(--fontWeight-semibold);
      line-height: var(--lineHeight-normal);
    }
    &[data-variant="subtitle1"] {
      font-size: var(--fontSize-base);
      font-weight: var(--fontWeight-medium);
      line-height: var(--lineHeight-normal);
      letter-spacing: 0.009em;
    }
    &[data-variant="subtitle2"] {
      font-size: var(--fontSize-sm);
      font-weight: var(--fontWeight-medium);
      line-height: 1.57;
      letter-spacing: 0.007em;
    }
    &[data-variant="body1"] {
      font-size: var(--fontSize-base);
      font-weight: var(--fontWeight-normal);
      line-height: var(--lineHeight-normal);
      letter-spacing: 0.012em;
    }
    &[data-variant="body2"] {
      font-size: var(--fontSize-sm);
      font-weight: var(--fontWeight-normal);
      line-height: var(--lineHeight-snug);
      letter-spacing: 0.01em;
    }
    &[data-variant="caption"] {
      font-size: var(--fontSize-xs);
      font-weight: var(--fontWeight-normal);
      line-height: var(--lineHeight-relaxed);
      letter-spacing: 0.027em;
    }
    &[data-variant="overline"] {
      font-size: var(--fontSize-xs);
      font-weight: var(--fontWeight-normal);
      line-height: 2.66;
      letter-spacing: 0.083em;
      text-transform: uppercase;
    }
    &[data-color="primary"] {
      color: var(--colors-text-primary);
    }
    &[data-color="secondary"] {
      color: var(--colors-text-secondary);
    }
    &[data-color="disabled"] {
      color: var(--colors-text-disabled);
    }
    &[data-color="success"] {
      color: var(--colors-success);
    }
    &[data-color="error"] {
      color: var(--colors-error);
    }
    &[data-color="warning"] {
      color: var(--colors-warning);
    }
    &[data-color="info"] {
      color: var(--colors-info);
    }
    &[data-color="muted"] {
      color: var(--colors-text-hint);
    }
    &[data-align="left"] {
      text-align: left;
    }
    &[data-align="center"] {
      text-align: center;
    }
    &[data-align="right"] {
      text-align: right;
    }
    &[data-align="justify"] {
      text-align: justify;
    }
    &[data-display="block"] {
      display: block;
    }
    &[data-display="inline"] {
      display: inline;
    }
    &[data-weight="normal"] {
      font-weight: var(--fontWeight-normal);
    }
    &[data-weight="medium"] {
      font-weight: var(--fontWeight-medium);
    }
    &[data-weight="semibold"] {
      font-weight: var(--fontWeight-semibold);
    }
    &[data-weight="bold"] {
      font-weight: var(--fontWeight-bold);
    }
    &[data-transform="lowercase"] {
      text-transform: lowercase;
    }
    &[data-transform="uppercase"] {
      text-transform: uppercase;
    }
    &[data-transform="capitalize"] {
      text-transform: capitalize;
    }
    &[data-decoration="none"] {
      text-decoration: none;
    }
    &[data-decoration="underline"] {
      text-decoration: underline;
    }
    &[data-decoration="lineThrough"] {
      text-decoration: line-through;
    }
    &[data-gutter-bottom] {
      margin-bottom: var(--spacing-2);
    }
  }
}
</style>
