<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerPortalProps } from '../types';

let { children, ...restProps }: DrawerPortalProps = $props();
</script>
<DialogPrimitive.Portal {...restProps}>
  {@render children?.()}
</DialogPrimitive.Portal>
