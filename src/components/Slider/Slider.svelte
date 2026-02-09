<script lang="ts">
import { Slider as SliderPrimitive } from 'bits-ui';
import styles from './styles.css';
import type { SliderProps } from './types';

let {
  ref = $bindable(null),
  value = $bindable(),
  orientation = 'horizontal',
  class: className,
  size = 'medium',
  ...restProps
}: SliderProps = $props();

const thumbClass = $derived([styles.thumb, styles.thumbSizes[size]]);
const trackClass = $derived([styles.track, styles.trackSizes[size]]);
</script>

<SliderPrimitive.Root
  bind:ref
  bind:value={value as never}
  data-slot="slider"
  {orientation}
  class={[styles.root, className]}
  {...restProps}
>
  {#snippet children({ thumbItems })}
    <span
      data-orientation={orientation}
      data-slot="slider-track"
      class={trackClass}
    >
      <SliderPrimitive.Range data-slot="slider-range" class={styles.range} />
    </span>
    {#each thumbItems as thumb (thumb)}
      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        index={thumb.index}
        class={thumbClass}
      />
    {/each}
  {/snippet}
</SliderPrimitive.Root>
