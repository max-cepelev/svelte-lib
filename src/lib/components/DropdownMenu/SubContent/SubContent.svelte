<script lang="ts">
import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
  bind:ref
  data-slot="dropdown-menu-sub-content"
  class={["sub-content", className]}
  {...restProps}
/>

<style>
:global([data-slot="dropdown-menu-sub-content"].sub-content) {
  background-color: var(--colors-background-paper);
  color: var(--colors-text-primary);
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: var(--radius-medium);
  border: 1px solid var(--colors-border);
  padding: var(--spacing-1);
  box-shadow: var(--shadow-3);
}
:global(
  [data-slot="dropdown-menu-sub-content"].sub-content[data-state="open"]
) {
  animation:
    fade-in 0.2s ease-out,
    zoom-in95 0.2s ease-out;
}
:global(
  [data-slot="dropdown-menu-sub-content"].sub-content[data-state="closed"]
) {
  animation:
    fade-out 0.2s ease-in,
    zoom-out95 0.2s ease-in;
}
:global(
  [data-slot="dropdown-menu-sub-content"].sub-content[data-side="bottom"]
) {
  animation: slide-in-from-top2 0.2s ease-out;
}
:global([data-slot="dropdown-menu-sub-content"].sub-content[data-side="left"]) {
  animation: slide-in-from-right2 0.2s ease-out;
}
:global(
  [data-slot="dropdown-menu-sub-content"].sub-content[data-side="right"]
) {
  animation: slide-in-from-left2 0.2s ease-out;
}
:global([data-slot="dropdown-menu-sub-content"].sub-content[data-side="top"]) {
  animation: slide-in-from-bottom2 0.2s ease-out;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes zoom-in95 {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes zoom-out95 {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.95);
  }
}
@keyframes slide-in-from-top2 {
  0% {
    transform: translateY(-0.5rem);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slide-in-from-bottom2 {
  0% {
    transform: translateY(0.5rem);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slide-in-from-left2 {
  0% {
    transform: translateX(0.5rem);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slide-in-from-right2 {
  0% {
    transform: translateX(-0.5rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
