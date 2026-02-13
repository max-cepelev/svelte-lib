<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerDescriptionProps } from '../types';
import styles from '../styles.css';

const { class: className, ...restProps }: DrawerDescriptionProps = $props();
</script>

<DialogPrimitive.Description
  data-slot="drawer-description"
  class={[styles.description, className]}
  {...restProps}
/>
