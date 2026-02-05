<script lang="ts">
import { ChevronRightIcon } from '@lucide/svelte';
import { Calendar as CalendarPrimitive } from 'bits-ui';
import { type ButtonVariant, buttonVariants } from '../../Button/index.js';
import styles from './styles.css.js';

let {
  ref = $bindable(null),
  class: className,
  children,
  variant = 'ghost',
  ...restProps
}: CalendarPrimitive.NextButtonProps & {
  variant?: ButtonVariant;
} = $props();
</script>

{#snippet fallback()}
  <ChevronRightIcon size={16} />
{/snippet}

<CalendarPrimitive.NextButton
  bind:ref
  class={[buttonVariants[variant], styles.nextButton, className]}
  children={children || fallback}
  {...restProps}
/>
