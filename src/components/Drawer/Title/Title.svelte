<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerTitleProps } from '../types';
import styles from '../styles.css';

const { class: className, ...restProps }: DrawerTitleProps = $props();
</script>

<DialogPrimitive.Title
  data-slot="drawer-title"
  class={[styles.title, className]}
  {...restProps}
/>
