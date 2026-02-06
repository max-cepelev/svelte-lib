<script lang="ts">
import { Loader } from '@lucide/svelte';
import type { ComponentProps } from 'svelte';
import styles from './styles.css';
import type { SpinnerSize } from './types';

let {
  class: className,
  size = 'medium',
  ...restProps
}: ComponentProps<typeof Loader> & {
  size?: SpinnerSize;
} = $props();
</script>

<Loader
  role="status"
  aria-label="Loading"
  class={[styles.spinner, styles.spinnerSizes[size], className]}
  {...restProps}
/>
