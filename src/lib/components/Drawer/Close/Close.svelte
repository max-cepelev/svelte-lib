<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerCloseProps } from '../types';

let props: DrawerCloseProps = $props();
</script>

<DialogPrimitive.Close data-slot="drawer-close" {...props} />
