<script lang="ts">
import { Slider as SliderPrimitive } from 'bits-ui';

import type { SliderProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(),
  orientation = 'horizontal',
  class: className,
  size = 'medium',
  trackClass,
  thumbClass,
  ...restProps
}: SliderProps = $props();
</script>

<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  class={className}
  {...restProps}
>
  {#snippet children({
    thumbItems,
  })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={['track', `track-size-${size}`, trackClass]}
    >
      <SliderPrimitive.Range data-slot="slider-range" />
    </span>
    {#each thumbItems as thumb (thumb.index)}
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        data-size={size}
        index={thumb.index}
        class={thumbClass}
      />
    {/each}
  {/snippet}
</SliderPrimitive.Root>

<style>
@layer max-ts-svelte-components {
  .track {
    background-color: var(--colors-background-element);
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    border-radius: 9999px;
  }
  .track-size-small {
    &[data-orientation="horizontal"] {
      height: 1px;
    }
    &[data-orientation="vertical"] {
      width: 1px;
    }
  }
  .track-size-medium {
    &[data-orientation="horizontal"] {
      height: 2px;
    }
    &[data-orientation="vertical"] {
      width: 2px;
    }
  }
  .track-size-large {
    &[data-orientation="horizontal"] {
      height: 3px;
    }
    &[data-orientation="vertical"] {
      width: 3px;
    }
  }
  :global {
    [data-slot="slider"] {
      position: relative;
      display: flex;
      width: 100%;
      touch-action: none;
      align-items: center;
      user-select: none;
      &[data-disabled] {
        opacity: 0.5;
      }
      &[data-orientation="vertical"] {
        flex-direction: column;
        height: 100%;
        min-height: 176px;
        width: auto;
      }
    }
    [data-slot="slider-range"] {
      background-color: var(--colors-primary);
      position: absolute;
      &[data-orientation="horizontal"] {
        height: 100%;
      }
      &[data-orientation="vertical"] {
        width: 100%;
      }
    }
    [data-slot="slider-thumb"] {
      display: block;
      flex-shrink: 0;
      border-radius: 9999px;
      border: 2px solid var(--colors-primary);
      background-color: var(--colors-background-paper);
      box-shadow: var(--shadow-1);
      transition:
        box-shadow 0.2s,
        transform 0.2s;
      cursor: grab;
      outline: none;
      &:hover {
        box-shadow: 0 0 0 4px
          color-mix(in oklch, var(--colors-primary) 15%, transparent);
      }
      &:focus-visible {
        box-shadow: 0 0 0 4px
          color-mix(in oklch, var(--colors-primary) 25%, transparent);
      }
      &:disabled {
        pointer-events: none;
        opacity: 0.5;
      }
      &[data-size="small"] {
        width: 11px;
        height: 11px;
      }
      &[data-size="medium"] {
        width: 13px;
        height: 13px;
      }
      &[data-size="large"] {
        width: 15px;
        height: 15px;
      }
    }
  }
}
</style>
