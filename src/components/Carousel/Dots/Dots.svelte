<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements';
  import { getEmblaContext } from '../context.js';
  import styles from './styles.css.js';

  let {
    class: className,
    ...restProps
  }: Omit<SvelteHTMLElements['div'], 'children'> = $props();

  const emblaCtx = getEmblaContext('<Carousel.Dots/>');

  const onClick = (index: number) => {
    emblaCtx.scrollTo(index);
  };
</script>

<div class={[styles.wrapper[emblaCtx.orientation], className]} {...restProps}>
  {#each emblaCtx.scrollSnaps as _, index}
    <button
      type="button"
      aria-label="Carousel Dots"
      class={[
        styles.dotButton[emblaCtx.orientation],
        {
          [styles.selected]: index === emblaCtx.selectedIndex,
        },
      ]}
      onclick={() => onClick(index)}
    ></button>
  {/each}
</div>
