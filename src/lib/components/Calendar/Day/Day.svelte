<script lang="ts">
import { Calendar as CalendarPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
  bind:ref
  class={["calendar-day", className]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  :global(.calendar-day) {
    border-radius: var(--radius-medium);
    border-width: 0;
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--fontWeight-medium);
    transition: background-color 0.2s;
    cursor: pointer;
    line-height: 100%;
    position: relative;
    background-color: transparent;
    color: var(--colors-text-primary);
    display: flex;
    width: var(--cell-size);
    height: var(--cell-size);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-1);
    padding: 0;
    white-space: nowrap;
    user-select: none;
  }
  :global(.calendar-day:hover) {
    background-color: var(--colors-background-elementHover);
  }
  :global(.calendar-day:focus-visible) {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: var(--elevation-1);
  }
  :global(.calendar-day:focus) {
    position: relative;
  }
  :global(.calendar-day[data-selected]) {
    background-color: var(--colors-primary);
    color: var(--colors-foreground-primary);
  }
  :global(.calendar-day[data-today]) {
    text-decoration: underline;
    text-underline-offset: var(--spacing-1);
    text-decoration-thickness: 2px;
  }
  :global(.calendar-day[data-disabled]) {
    color: var(--colors-text-secondary);
    pointer-events: none;
    opacity: 0.5;
  }
  :global(.calendar-day[data-unavailable]) {
    color: var(--colors-text-secondary);
    text-decoration: line-through;
  }
  :global(.calendar-day) > :global(span) {
    font-size: var(--fontSize-xs);
    opacity: 0.7;
  }
  :global(.calendar-day[data-today][data-disabled]) {
    color: var(--colors-text-hint);
  }
  :global(.calendar-day[data-outside-month]:not([data-selected])) {
    color: var(--colors-text-hint);
  }
  :global(.calendar-day[data-outside-month]:not([data-selected]):hover) {
    color: var(--colors-text-primary);
  }
}
</style>
