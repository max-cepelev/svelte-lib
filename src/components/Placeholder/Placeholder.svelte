<script lang="ts">
import { Typography } from '../Typography';
import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  MAX_INNER_WIDTH,
  TITLE_HEADER_LEVEL,
} from './constants';
import { Image } from './Image';
import styles from './styles.css';
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
        class={styles.descriptionClass}
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
