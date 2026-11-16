<script
  lang="ts"
  generics="T extends ToggleGroupValue, Multiple extends boolean = false"
>
import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
import { observeActiveIndicator } from '../../observeActiveIndicator';
import { Tooltip } from '../Tooltip';
import { observeViewport } from './observeViewport';
import type {
  ToggleGroupOption,
  ToggleGroupProps,
  ToggleGroupSelection,
  ToggleGroupValue,
} from './types';

let {
  ref = $bindable(null),
  value = $bindable(),
  options,
  onChange,
  multiple,
  variant = 'default',
  size = 'medium',
  label,
  class: className,
  ...restProps
}: ToggleGroupProps<T, Multiple> = $props();

const labelId = $props.id();
const encodeValue = (optionValue: T) => `${typeof optionValue}:${optionValue}`;

function getSingleValue() {
  return value !== undefined && !Array.isArray(value) ? encodeValue(value) : '';
}

function getMultipleValue() {
  return Array.isArray(value) ? value.map(encodeValue) : [];
}

function setSingleValue(next: string) {
  // Bits UI allows deselection; like the React component, single selection stays on.
  if (!next) {
    if (value !== undefined) onChange?.(value);
    return;
  }
  const option = options.find((option) => encodeValue(option.value) === next);
  if (!option) return;
  value = option.value as ToggleGroupSelection<T, Multiple>;
  onChange?.(value);
}

function setMultipleValue(next: string[]) {
  // Include existing values so changing one option preserves selections not in options.
  const current = Array.isArray(value) ? value : [];
  const valuesByKey = new Map(
    [...current, ...options.map((option) => option.value)].map(
      (optionValue) => [encodeValue(optionValue), optionValue],
    ),
  );
  value = next.flatMap((key) => {
    const optionValue = valuesByKey.get(key);
    return optionValue === undefined ? [] : [optionValue];
  }) as ToggleGroupSelection<T, Multiple>;
  onChange?.(value);
}

$effect(() => {
  if (ref && variant === 'default' && !multiple) {
    return observeActiveIndicator(ref, {
      itemSelector: '[data-slot="toggle-group-item"]',
      activeState: 'on',
      cssVariablePrefix: '--toggle-group-indicator',
    });
  }
});

$effect(() => {
  if (ref) return observeViewport(ref);
});
</script>

{#snippet item(option: ToggleGroupOption<T>, index: number)}
  <ToggleGroupPrimitive.Item
    value={encodeValue(option.value)}
    disabled={option.disabled}
    aria-label={option.ariaLabel}
    data-slot="toggle-group-item"
    data-first={index === 0 || undefined}
    data-last={index === options.length - 1 || undefined}
  >
    {#if option.startAdornment}
      {@render option.startAdornment()}
    {/if}
    {#if typeof option.label === 'string'}
      {option.label}
    {:else}
      {@render option.label()}
    {/if}
    {#if option.endAdornment}
      {@render option.endAdornment()}
    {/if}
  </ToggleGroupPrimitive.Item>
{/snippet}

{#snippet items()}
  {#if variant === 'default' && !multiple}
    <span
      class="indicator"
      data-slot="toggle-group-indicator"
      aria-hidden="true"
    ></span>
  {/if}
  {#each options as option, index (encodeValue(option.value))}
    {#if option.title}
      <Tooltip content={option.title} arrow>
        {@render item(option, index)}
      </Tooltip>
    {:else}
      {@render item(option, index)}
    {/if}
  {/each}
{/snippet}

<div class={['container', className]} data-slot="toggle-group">
  {#if label}
    <span id={labelId} class="label" data-slot="toggle-group-label"
      >{label}</span
    >
  {/if}
  {#key !!multiple}
    {#if multiple}
      <ToggleGroupPrimitive.Root
        bind:ref
        type="multiple"
        bind:value={getMultipleValue, setMultipleValue}
        data-slot="toggle-group-list"
        data-variant={variant}
        data-size={size}
        data-multiple
        aria-labelledby={label ? labelId : undefined}
        {...restProps}
      >
        {@render items()}
      </ToggleGroupPrimitive.Root>
    {:else}
      <ToggleGroupPrimitive.Root
        bind:ref
        type="single"
        bind:value={getSingleValue, setSingleValue}
        data-slot="toggle-group-list"
        data-variant={variant}
        data-size={size}
        aria-labelledby={label ? labelId : undefined}
        {...restProps}
      >
        {@render items()}
      </ToggleGroupPrimitive.Root>
    {/if}
  {/key}
</div>

<style>
@layer max-ts-svelte-components {
  .container {
    min-width: 0;
    max-width: 100%;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .label {
    display: block;
    margin-bottom: var(--spacing-1);
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
  }

  .container :global([data-slot="toggle-group-list"]) {
    --toggle-group-height: var(--spacing-9);
    --toggle-group-padding: var(--spacing-1);
    --toggle-group-item-height: calc(
      var(--toggle-group-height) -
      2 *
      var(--toggle-group-padding)
    );
    --toggle-group-indicator-x: 0px;
    --toggle-group-indicator-y: 0px;
    --toggle-group-indicator-width: 0px;
    --toggle-group-indicator-height: 0px;
    --toggle-group-overflow-fade: var(--spacing-4);
    --toggle-group-fade-start: 0px;
    --toggle-group-fade-end: 0px;
    position: relative;
    isolation: isolate;
    display: inline-flex;
    box-sizing: border-box;
    max-width: 100%;
    align-items: stretch;
    gap: var(--spacing-1);
    overflow: auto;
    scroll-padding: var(--toggle-group-overflow-fade);
    scrollbar-width: none;
    border-radius: var(--radius-medium);
    background-color: var(--colors-background-element);
    padding: var(--toggle-group-padding);
    color: var(--colors-text-secondary);
    vertical-align: middle;

    &::-webkit-scrollbar {
      display: none;
    }

    &:global([data-size="small"]),
    &:global([data-size="iconSmall"]) {
      --toggle-group-height: var(--spacing-7);
    }

    &:global([data-size="large"]) {
      --toggle-group-height: var(--spacing-10);
    }

    &:global([data-orientation="vertical"]) {
      flex-direction: column;
      width: fit-content;
    }

    &:global([data-overflow-start]) {
      --toggle-group-fade-start: var(--toggle-group-overflow-fade);
    }

    &:global([data-overflow-end]) {
      --toggle-group-fade-end: var(--toggle-group-overflow-fade);
    }

    &:global([data-overflow-start]),
    &:global([data-overflow-end]) {
      mask-image: linear-gradient(
        to right,
        transparent,
        #000 var(--toggle-group-fade-start),
        #000 calc(100% - var(--toggle-group-fade-end)),
        transparent
      );

      &:global([data-orientation="vertical"]) {
        mask-image: linear-gradient(
          to bottom,
          transparent,
          #000 var(--toggle-group-fade-start),
          #000 calc(100% - var(--toggle-group-fade-end)),
          transparent
        );
      }
    }
  }

  .container :global([data-slot="toggle-group-item"]) {
    position: relative;
    z-index: 1;
    display: inline-flex;
    box-sizing: border-box;
    height: var(--toggle-group-item-height);
    flex: 1 0 auto;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2);
    border: 1px solid transparent;
    border-radius: var(--radius-small);
    background-color: transparent;
    padding: 0 var(--spacing-1);
    color: inherit;
    font-family: inherit;
    font-size: var(--fontSize-sm);
    font-weight: var(--fontWeight-medium);
    line-height: var(--lineHeight-tight);
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--colors-text-primary);
    }

    &:focus-visible {
      z-index: 2;
      border-color: var(--colors-primary);
      outline: none;
      box-shadow: 0 0 0 3px
        color-mix(in oklch, var(--colors-primary) 20%, transparent);
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &:global([data-state="on"]) {
      background-color: var(--colors-background-paper);
      color: var(--colors-text-primary);
      box-shadow: var(--elevation-1);
    }

    & :global(svg) {
      width: var(--spacing-4);
      height: var(--spacing-4);
      flex-shrink: 0;
      pointer-events: none;
    }
  }

  .container
    :global([data-slot="toggle-group-list"][data-size="large"])
    :global([data-slot="toggle-group-item"]) {
    padding-inline: var(--spacing-3);
    font-size: var(--fontSize-base);
  }

  .container
    :global([data-slot="toggle-group-list"][data-size^="icon"])
    :global([data-slot="toggle-group-item"]) {
    width: var(--toggle-group-item-height);
    flex: 0 0 auto;
    padding: 0;
  }

  .indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--toggle-group-indicator-width);
    height: var(--toggle-group-indicator-height);
    transform: translate(
      var(--toggle-group-indicator-x),
      var(--toggle-group-indicator-y)
    );
    visibility: hidden;
    border-radius: var(--radius-small);
    background-color: var(--colors-background-paper);
    box-shadow: var(--elevation-1);
    pointer-events: none;
  }

  .container :global([data-slot="toggle-group-list"][data-indicator-ready]) {
    .indicator {
      visibility: visible;
    }

    :global([data-slot="toggle-group-item"][data-state="on"]) {
      background-color: transparent;
      &:not(:focus-visible) {
        box-shadow: none;
      }
    }
  }

  .container :global([data-slot="toggle-group-list"][data-variant="group"]) {
    --toggle-group-padding: 0px;
    gap: 0;
    background-color: transparent;

    :global([data-slot="toggle-group-item"]) {
      z-index: 0;
      border-color: var(--colors-border);
      border-radius: 0;
      background-color: var(--colors-background-paper);
      padding-inline: var(--spacing-3);
      color: var(--colors-text-primary);
      font-size: var(--fontSize-base);

      &:hover {
        background-color: var(--colors-background-elementHover);
      }

      &:global([data-state="on"]) {
        z-index: 1;
        border-color: var(--colors-primary);
        background-color: var(--colors-primary);
        color: var(--colors-foreground-primary);
        box-shadow: none;

        &:hover {
          background-color: color-mix(
            in oklch,
            var(--colors-primary) 85%,
            transparent
          );
        }
      }

      &:focus-visible {
        z-index: 2;
        outline: 2px solid currentColor;
        outline-offset: -4px;
      }
    }

    &:global([data-size="small"]) :global([data-slot="toggle-group-item"]) {
      padding-inline: var(--spacing-2);
      font-size: var(--fontSize-sm);
    }

    &:global([data-size="large"]) :global([data-slot="toggle-group-item"]) {
      padding-inline: var(--spacing-4);
      font-size: var(--fontSize-lg);
    }

    &:global([data-size^="icon"]) :global([data-slot="toggle-group-item"]) {
      padding: 0;
    }

    &:global([data-orientation="horizontal"])
      :global([data-slot="toggle-group-item"]) {
      &:not(:global([data-first])) {
        margin-left: -1px;
      }
      &:global([data-first]) {
        border-top-left-radius: var(--radius-medium);
        border-bottom-left-radius: var(--radius-medium);
      }
      &:global([data-last]) {
        border-top-right-radius: var(--radius-medium);
        border-bottom-right-radius: var(--radius-medium);
      }
    }

    &:global([data-orientation="vertical"])
      :global([data-slot="toggle-group-item"]) {
      &:not(:global([data-first])) {
        margin-top: -1px;
      }
      &:global([data-first]) {
        border-top-left-radius: var(--radius-medium);
        border-top-right-radius: var(--radius-medium);
      }
      &:global([data-last]) {
        border-bottom-left-radius: var(--radius-medium);
        border-bottom-right-radius: var(--radius-medium);
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .container
      :global([data-slot="toggle-group-list"][data-indicator-ready="true"]) {
      .indicator {
        transition:
          transform 0.22s ease,
          width 0.22s ease,
          height 0.22s ease;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .container :global([data-slot="toggle-group-item"]) {
      transition: none;
    }
  }
}
</style>
