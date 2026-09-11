<script lang="ts">
import type { InputGroupAddonProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  align = 'inline-start',
  onpointerdown,
  ...restProps
}: InputGroupAddonProps = $props();

const classNames = $derived(['addon', `align-${align}`, className]);

const focusControl = (element: HTMLElement | null) => {
  const control = element?.parentElement?.querySelector<
    HTMLInputElement | HTMLTextAreaElement
  >(
    'input[data-slot="input-group-control"], textarea[data-slot="input-group-control"]',
  );
  control?.focus();
};

type PointerDownHandler = NonNullable<InputGroupAddonProps['onpointerdown']>;

const handlePointerDown: PointerDownHandler = (event) => {
  onpointerdown?.(event);
  if (event.defaultPrevented) return;

  const target = event.target;
  if (target instanceof Element && target.closest('[data-slot="button"]')) {
    return;
  }
  focusControl(event.currentTarget);
};
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change the addon's layout and form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="input-group-addon"
  data-align={align}
  class={classNames}
  onpointerdown={handlePointerDown}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
@layer max-ts-svelte-components {
  .addon {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    color: var(--colors-text-hint);
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
    padding-block: var(--spacing-2);
    padding-inline: var(--spacing-2);
    cursor: text;
    user-select: none;
    min-height: var(--spacing-9);
  }
  .align-inline-start {
    order: -1;
    padding-inline-start: var(--spacing-3);
  }
  .align-inline-end {
    order: 1;
    padding-inline-end: var(--spacing-3);
  }
  .align-block-start {
    order: -1;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    padding-inline: var(--spacing-3);
    padding-bottom: var(--spacing-2);
    border-bottom: 1px solid var(--colors-border);
    min-height: auto;
  }
  .align-block-end {
    order: 1;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-end;
    padding-inline: var(--spacing-3);
    padding-top: var(--spacing-2);
    border-top: 1px solid var(--colors-border);
    min-height: auto;
  }
  .addon > :global(svg) {
    pointer-events: none;
  }
  .addon > :global(svg:not([class*="size-"])) {
    width: 1rem;
    height: 1rem;
  }
  .addon > :global(kbd) {
    border-radius: calc(var(--radius-medium) - 4px);
  }
  :global([data-slot="input-group"][data-disabled="true"]) .addon {
    opacity: 0.6;
  }
}
</style>
