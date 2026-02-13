<script lang="ts">
import { Dialog as DialogPrimitive } from 'bits-ui';
import { onDestroy } from 'svelte';
import type { Snippet } from 'svelte';
import { setDrawerContext } from './context';
import type { DrawerProps } from './types';

let {
  open = $bindable(false),
  notCloseable = false,
  shouldScaleBackground = false,
  children,
  onOpenChange,
  ...restProps
}: DrawerProps & { children?: Snippet } = $props();

const close = () => {
  if (notCloseable) return;
  open = false;
  onOpenChange?.(false);
};

setDrawerContext({
  close,
  isOpen: () => open,
  isNotCloseable: () => notCloseable,
});

const SCALE_CLASS = 'drawer-scaled-background';

$effect(() => {
  if (!shouldScaleBackground) return;
  const classList = document.documentElement.classList;
  if (open) classList.add(SCALE_CLASS);
  else classList.remove(SCALE_CLASS);
});

onDestroy(() => {
  document.documentElement.classList.remove(SCALE_CLASS);
});

function handleOpenChange(value: boolean) {
  if (notCloseable && !value) {
    return;
  }
  open = value;
  onOpenChange?.(value);
}
</script>

<DialogPrimitive.Root bind:open onOpenChange={handleOpenChange} {...restProps}>
  {@render children?.()}
</DialogPrimitive.Root>
