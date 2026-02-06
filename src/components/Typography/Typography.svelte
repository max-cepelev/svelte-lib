<script lang="ts">
import {
  alignments,
  colors,
  decorations,
  displays,
  gutterBottomClass,
  transforms,
  variants,
  weights,
} from './styles.css';
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
  ref,
  class: [
    decorations[decoration],
    variants[variant],
    colors[color],
    weights[weight],
    transform && transforms[transform],
    displays[display],
    alignments[align],
    {
      [gutterBottomClass]: gutterBottom,
    },
    className,
  ],
});
</script>

<svelte:element this={TagComponent} {...mergedProps}>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>
