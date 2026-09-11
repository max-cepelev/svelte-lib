<script lang="ts">
import Button from '../../Button/Button.svelte';

import type { InputGroupButtonProps, InputGroupButtonSize } from '../types';
import type { ButtonSize } from '../../Button/types';

const buttonSizeMap: Record<InputGroupButtonSize, ButtonSize> = {
  sm: 'small',
  xs: 'small',
  'icon-sm': 'icon',
  'icon-xs': 'iconSmall',
};

let {
  ref = $bindable(null),
  class: className,
  children,
  size = 'xs',
  variant = 'ghost',
  type = 'button',
  ...restProps
}: InputGroupButtonProps = $props();

const classNames = $derived(['button', `size-${size}`, className]);
</script>

<Button
  bind:ref
  data-input-group-button
  size={buttonSizeMap[size]}
  {variant}
  {type}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</Button>

<style>
@layer max-ts-svelte-components {
  :global([data-input-group-button].button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-1);
    box-shadow: none;
    font-size: var(--fontSize-sm);
  }
  :global([data-input-group-button].button.size-xs) {
    height: var(--spacing-6);
    padding-inline: var(--spacing-2);
    border-radius: var(--radius-small);
  }
  :global([data-input-group-button].button.size-sm) {
    height: var(--spacing-8);
    padding-inline: var(--spacing-3);
    border-radius: var(--radius-medium);
  }
  :global([data-input-group-button].button.size-icon-xs) {
    height: var(--spacing-6);
    width: var(--spacing-6);
    padding: 0;
    border-radius: var(--radius-small);
  }
  :global([data-input-group-button].button.size-icon-sm) {
    height: var(--spacing-8);
    width: var(--spacing-8);
    padding: 0;
    border-radius: var(--radius-medium);
  }
  :global([data-input-group-button].button) :global(svg) {
    pointer-events: none;
  }
  :global([data-input-group-button].button) :global(svg:not([class*="size-"])) {
    width: 1rem;
    height: 1rem;
  }
}
</style>
