<script lang="ts">
import { Select as SelectPrimitive } from 'bits-ui';
import { setSelectContext } from './context.svelte';

let {
  open = $bindable(false),
  value = $bindable(),
  ...restProps
}: SelectPrimitive.RootProps = $props();

setSelectContext({
  get type() {
    return restProps.type;
  },
});
</script>

<SelectPrimitive.Root bind:open bind:value={value as never} {...restProps} />
