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

const mergedProps = $derived({
  ...restProps,
  class: [
    `decoration-${decoration}`,
    `variant-${variant}`,
    `color-${color}`,
    `weight-${weight}`,
    transform && `transform-${transform}`,
    `display-${display}`,
    `align-${align}`,
    {
      'gutter-bottom': gutterBottom,
    },
    className,
  ],
});
</script>

<svelte:element this={TagComponent} bind:this={ref} {...mergedProps}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
.variant-h1 {
  font-size: var(--fontSize-4xl);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-tight);
  letter-spacing: -0.025em;
}
.variant-h2 {
  font-size: var(--fontSize-3xl);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-tight);
  letter-spacing: -0.025em;
}
.variant-h3 {
  font-size: var(--fontSize-2xl);
  font-weight: var(--fontWeight-bold);
  line-height: var(--lineHeight-snug);
  letter-spacing: -0.025em;
}
.variant-h4 {
  font-size: var(--fontSize-xl);
  font-weight: var(--fontWeight-semibold);
  line-height: var(--lineHeight-snug);
}
.variant-h5 {
  font-size: var(--fontSize-lg);
  font-weight: var(--fontWeight-semibold);
  line-height: var(--lineHeight-normal);
}
.variant-h6 {
  font-size: var(--fontSize-base);
  font-weight: var(--fontWeight-semibold);
  line-height: var(--lineHeight-normal);
}
.variant-subtitle1 {
  font-size: var(--fontSize-base);
  font-weight: var(--fontWeight-medium);
  line-height: var(--lineHeight-normal);
  letter-spacing: 0.009em;
}
.variant-subtitle2 {
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-medium);
  line-height: 1.57;
  letter-spacing: 0.007em;
}
.variant-body1 {
  font-size: var(--fontSize-base);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-normal);
  letter-spacing: 0.012em;
}
.variant-body2 {
  font-size: var(--fontSize-sm);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-snug);
  letter-spacing: 0.01em;
}
.variant-caption {
  font-size: var(--fontSize-xs);
  font-weight: var(--fontWeight-normal);
  line-height: var(--lineHeight-relaxed);
  letter-spacing: 0.027em;
}
.variant-overline {
  font-size: var(--fontSize-xs);
  font-weight: var(--fontWeight-normal);
  line-height: 2.66;
  letter-spacing: 0.083em;
  text-transform: uppercase;
}
.color-primary {
  color: var(--colors-text-primary);
}
.color-secondary {
  color: var(--colors-text-secondary);
}
.color-disabled {
  color: var(--colors-text-disabled);
}
.color-success {
  color: var(--colors-success);
}
.color-error {
  color: var(--colors-error);
}
.color-warning {
  color: var(--colors-warning);
}
.color-info {
  color: var(--colors-info);
}
.color-muted {
  color: var(--colors-text-hint);
}
.align-left {
  text-align: left;
}
.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}
.align-justify {
  text-align: justify;
}
.display-block {
  display: block;
}
.display-inline {
  display: inline;
}
.weight-normal {
  font-weight: var(--fontWeight-normal);
}
.weight-medium {
  font-weight: var(--fontWeight-medium);
}
.weight-semibold {
  font-weight: var(--fontWeight-semibold);
}
.weight-bold {
  font-weight: var(--fontWeight-bold);
}
.transform-lowercase {
  text-transform: lowercase;
}
.transform-uppercase {
  text-transform: uppercase;
}
.transform-capitalize {
  text-transform: capitalize;
}
.decoration-none {
  text-decoration: none;
}
.decoration-underline {
  text-decoration: underline;
}
.decoration-lineThrough {
  text-decoration: line-through;
}
.gutter-bottom {
  margin-bottom: var(--spacing-2);
}
</style>
