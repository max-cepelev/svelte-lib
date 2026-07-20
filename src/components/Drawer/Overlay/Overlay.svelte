<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerOverlayProps } from '../types';
import * as styles from '../styles.css';

let { class: className, ...restProps }: DrawerOverlayProps = $props();
</script>

<DialogPrimitive.Overlay
  data-slot="drawer-overlay"
  class={[styles.overlay, className]}
  {...restProps}
/>
