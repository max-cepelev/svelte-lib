<script lang="ts">
import { ChevronRightIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { Button, type ButtonVariant } from '../../Button';

let {
  ref = $bindable(null),
  class: className,
  children,
  child: customChild,
  variant = 'ghost',
  ...restProps
}: CalendarPrimitive.NextButtonProps & {
  variant?: ButtonVariant;
} = $props();
</script>

{#snippet fallback()}
  <ChevronRightIcon size={16} />
{/snippet}

<CalendarPrimitive.NextButton bind:ref class={className} {...restProps}>
  {#snippet child({ props })}
    {#if customChild}
      {@render customChild({ props })}
    {:else}
      <Button
        {...props}
        {variant}
        size="icon"
        data-slot="calendar-next-button"
        class={[props.class]}
      >
        {@render (children || fallback)()}
      </Button>
    {/if}
  {/snippet}
</CalendarPrimitive.NextButton>

<style>
:global([data-slot="calendar-next-button"][disabled]) {
  opacity: 0.5;
}
:global([dir="rtl"] [data-slot="calendar-next-button"]) {
  transform: rotate(180deg);
}
</style>
