<script lang="ts">
import { Typography } from '../Typography';
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  MAX_INNER_WIDTH,
  TITLE_HEADER_LEVEL,
} from './constants';
import { Image } from './Image';

import type { PlaceholderProps } from './types';

let {
  class: className,
  title,
  imgSrc,
  imgAlt,
  description,
  actions,
  size = 'small',
}: PlaceholderProps = $props();
</script>

<div class={["wrapper",`size-${size}`, className]}>
  <div class="inner-container" style:max-width={MAX_INNER_WIDTH[size]}>
    {#if imgSrc}
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={IMAGE_WIDTH[size]}
        height={IMAGE_HEIGHT[size]}
        {size}
      />
    {/if}

    <Typography
      align="center"
      color="secondary"
      variant={TITLE_HEADER_LEVEL[size]}
    >
      {title}
    </Typography>

    {#if description}
      <Typography
        class="placeholder-description"
        component="div"
        variant="body1"
      >
        {description}
      </Typography>
    {/if}
  </div>

  {#if actions}
    <footer class="footer">{@render actions()}</footer>
  {/if}
</div>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: var(--spacing-4);
  background-color: var(--colors-background-paper);
}
.size-small {
  gap: var(--spacing-4);
}
.size-medium {
  gap: var(--spacing-8);
}
.size-large {
  gap: var(--spacing-10);
}
.inner-container {
  margin: 0 auto;
}
:global(.placeholder-description) {
  text-align: center;
  display: block;
  color: var(--colors-text-secondary);
}
.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: var(--colors-text-secondary);
  gap: var(--spacing-2);
}
@media (max-width: 560px) {
  .wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr max-content;
    gap: var(--spacing-4);
  }
}
</style>
