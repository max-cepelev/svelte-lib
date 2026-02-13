<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import type { DrawerTriggerProps } from '../types';

let { ...restProps }: DrawerTriggerProps = $props();
</script>

<DialogPrimitive.Trigger data-slot="drawer-trigger" {...restProps} />
