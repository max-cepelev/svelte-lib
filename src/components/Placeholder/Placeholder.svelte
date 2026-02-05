<script lang="ts">
import { Typography } from '../Typography/index.js';
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  MAX_INNER_WIDTH,
  TITLE_HEADER_LEVEL,
} from './constants.js';
import { Image } from './Image/index.js';
import styles from './styles.css.js';
import type { PlaceholderProps } from './types.js';

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

<div class={[styles.wrapper,styles.sizes[size], className]}>
  <div class={styles.innerContainer} style:max-width={MAX_INNER_WIDTH[size]}>
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
        className={styles.descriptionClass}
        component="div"
        variant="body1"
      >
        {description}
      </Typography>
    {/if}
  </div>

  {#if actions}
    <footer class={styles.footerClass}>{@render actions()}</footer>
  {/if}
</div>
