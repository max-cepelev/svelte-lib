<script lang="ts">
import { ChevronLeftIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { Button, type ButtonVariant } from '../../Button';

let {
  ref = $bindable(null),
  class: className,
  children,
  child: customChild,
  variant = 'ghost',
  ...restProps
}: CalendarPrimitive.PrevButtonProps & {
  variant?: ButtonVariant;
} = $props();
</script>

{#snippet fallback()}
  <ChevronLeftIcon size={16} />
{/snippet}

<CalendarPrimitive.PrevButton bind:ref class={className} {...restProps}>
  {#snippet child({ props })}
    {#if customChild}
      {@render customChild({ props })}
    {:else}
      <Button
        {...props}
        {variant}
        size="icon"
        data-slot="calendar-prev-button"
        class={[props.class]}
      >
        {@render (children || fallback)()}
      </Button>
    {/if}
  {/snippet}
</CalendarPrimitive.PrevButton>

<style>
:global([dir="rtl"] [data-slot="calendar-prev-button"]) {
  transform: rotate(180deg);
}
</style>
