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
  class={["root", className]}
  {...restProps}
>
  {#snippet children({ thumbItems })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={["track", `track-size-${size}`, trackClass]}
    >
      <SliderPrimitive.Range data-slot="slider-range" class="range" />
    </span>
    {#each thumbItems as thumb (thumb)}
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        index={thumb.index}
        class={["thumb", `thumb-size-${size}`, thumbClass]}
      />
    {/each}
  {/snippet}
</SliderPrimitive.Root>

<style>
:global([data-slot="slider"].root) {
  position: relative;
  display: flex;
  width: 100%;
  touch-action: none;
  align-items: center;
  user-select: none;
}
:global([data-slot="slider"].root[data-disabled]) {
  opacity: 0.5;
}
:global([data-slot="slider"].root[data-orientation="vertical"]) {
  flex-direction: column;
  height: 100%;
  min-height: 176px;
  width: auto;
}
.track {
  background-color: var(--colors-background-element);
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  border-radius: 9999px;
}
:global([data-slot="slider"].root[data-orientation="horizontal"])
  .track-size-small {
  height: 1px;
}
:global([data-slot="slider"].root[data-orientation="vertical"])
  .track-size-small {
  width: 1px;
}
:global([data-slot="slider"].root[data-orientation="horizontal"])
  .track-size-medium {
  height: 2px;
}
:global([data-slot="slider"].root[data-orientation="vertical"])
  .track-size-medium {
  width: 2px;
}
:global([data-slot="slider"].root[data-orientation="horizontal"])
  .track-size-large {
  height: 3px;
}
:global([data-slot="slider"].root[data-orientation="vertical"])
  .track-size-large {
  width: 3px;
}
:global([data-slot="slider-range"].range) {
  background-color: var(--colors-primary);
  position: absolute;
}
:global([data-slot="slider"].root[data-orientation="horizontal"])
  :global([data-slot="slider-range"].range) {
  height: 100%;
}
:global([data-slot="slider"].root[data-orientation="vertical"])
  :global([data-slot="slider-range"].range) {
  width: 100%;
}
:global([data-slot="slider-thumb"].thumb) {
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
}
:global([data-slot="slider-thumb"].thumb:hover) {
  box-shadow: 0 0 0 4px
    color-mix(in oklch, var(--colors-primary) 15%, transparent);
}
:global([data-slot="slider-thumb"].thumb:focus-visible) {
  box-shadow: 0 0 0 4px
    color-mix(in oklch, var(--colors-primary) 25%, transparent);
}
:global([data-slot="slider-thumb"].thumb:disabled) {
  pointer-events: none;
  opacity: 0.5;
}
:global([data-slot="slider-thumb"].thumb-size-small) {
  width: 11px;
  height: 11px;
}
:global([data-slot="slider-thumb"].thumb-size-medium) {
  width: 13px;
  height: 13px;
}
:global([data-slot="slider-thumb"].thumb-size-large) {
  width: 15px;
  height: 15px;
}
</style>
