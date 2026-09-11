<script lang="ts">
import { XIcon } from '@lucide/svelte';
import { Select as SelectPrimitive } from 'bits-ui';
import { tick } from 'svelte';

type ValueSnippetProps = Parameters<
  NonNullable<SelectPrimitive.ValueProps['children']>
>[0];
type MultipleSelection = Extract<
  ValueSnippetProps['selection'],
  { type: 'multiple' }
>;

let {
  disabled,
  selection,
}: {
  disabled: boolean;
  selection: MultipleSelection;
} = $props();

let containerRef = $state<HTMLSpanElement | null>(null);
let measureRef = $state<HTMLSpanElement | null>(null);
let overflowMeasureRef = $state<HTMLSpanElement | null>(null);
let visibleCount = $state(Number.POSITIVE_INFINITY);

const visibleValues = $derived(selection.selected.slice(0, visibleCount));
const hiddenCount = $derived(
  Math.max(0, selection.selected.length - visibleCount),
);

function updateVisibleCount() {
  if (!containerRef || !measureRef || !overflowMeasureRef) return;

  const chipElements = Array.from(
    measureRef.querySelectorAll<HTMLElement>('[data-chip-measure="chip"]'),
  );
  const styles = getComputedStyle(measureRef);
  const gap = Number.parseFloat(styles.columnGap || '0') || 0;
  const availableWidth = containerRef.clientWidth;
  const chipWidths = chipElements.map((element) => element.offsetWidth);
  const totalWidth = chipWidths.reduce(
    (total, width, index) => total + width + (index > 0 ? gap : 0),
    0,
  );

  if (totalWidth <= availableWidth) {
    visibleCount = selection.selected.length;
    return;
  }

  const overflowWidth = overflowMeasureRef.offsetWidth;
  const availableForChips = Math.max(0, availableWidth - overflowWidth - gap);
  let nextVisibleCount = 0;
  let usedWidth = 0;

  for (const chipWidth of chipWidths) {
    const nextWidth = usedWidth + chipWidth + (nextVisibleCount > 0 ? gap : 0);

    if (nextWidth > availableForChips) break;

    usedWidth = nextWidth;
    nextVisibleCount += 1;
  }

  visibleCount = nextVisibleCount;
}

function handlePointerDown(event: PointerEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function removeValue(value: string, event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  selection.setValue(
    selection.selected
      .filter((selected) => selected.value !== value)
      .map((selected) => selected.value),
  );
}

$effect(() => {
  selection.selected;
  tick().then(updateVisibleCount);
});

$effect(() => {
  if (!containerRef || typeof ResizeObserver === 'undefined') return;

  const observer = new ResizeObserver(updateVisibleCount);
  observer.observe(containerRef);

  return () => observer.disconnect();
});
</script>

<span bind:this={containerRef} class="chips" data-slot="select-value-chips">
  <span
    bind:this={measureRef}
    aria-hidden="true"
    class="measure"
    data-slot="select-value-chips-measure"
  >
    {#each selection.selected as selected (selected.value)}
      <span class="chip" data-chip-measure="chip">
        <span class="label">{selected.label}</span>
        <span class="remove"><XIcon /></span>
      </span>
    {/each}
    <span
      bind:this={overflowMeasureRef}
      class="chip"
      data-chip-measure="overflow"
    >
      +{selection.selected.length}
    </span>
  </span>

  {#each visibleValues as selected (selected.value)}
    <span class="chip" data-removable data-slot="select-value-chip">
      <span class="label">{selected.label}</span>
      <button
        aria-label={`Remove ${selected.label}`}
        class="remove"
        data-slot="select-value-chip-remove"
        {disabled}
        onclick={(event) => removeValue(selected.value, event)}
        onpointerdown={handlePointerDown}
        type="button"
      >
        <XIcon />
      </button>
    </span>
  {/each}

  {#if hiddenCount > 0}
    <span class="chip" data-slot="select-value-chip">+{hiddenCount}</span>
  {/if}
</span>

<style>
@layer max-ts-svelte-components {
  .chips {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    gap: var(--spacing-1);
    overflow: hidden;
  }
  .measure {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    gap: var(--spacing-1);
    visibility: hidden;
    pointer-events: none;
    white-space: nowrap;
  }
  .chip {
    display: inline-flex;
    width: fit-content;
    height: var(--spacing-5);
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-1);
    border-radius: var(--radius-small);
    background-color: var(--colors-background-element);
    padding: 0 var(--spacing-2);
    color: var(--colors-text-primary);
    font-size: var(--fontSize-xs);
    font-weight: var(--fontWeight-medium);
    white-space: nowrap;

    &[data-removable] {
      padding-right: 0;
    }
  }
  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remove {
    display: inline-flex;
    width: var(--spacing-5);
    height: var(--spacing-5);
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-small);
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity ease-in-out 0.2s;

    &:hover {
      opacity: 1;
    }
    &:disabled {
      cursor: not-allowed;
    }
    & :global(svg) {
      width: var(--spacing-3);
      height: var(--spacing-3);
      pointer-events: none;
    }
  }
}
</style>
