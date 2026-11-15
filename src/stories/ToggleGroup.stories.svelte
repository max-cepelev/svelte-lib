<script module lang="ts">
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CalendarIcon,
  ItalicIcon,
  UnderlineIcon,
} from '@lucide/svelte';
import { defineMeta } from '@storybook/addon-svelte-csf';
import {
  ToggleGroup,
  type ToggleGroupOption,
  type ToggleGroupSize,
} from '../lib/components';

const { Story } = defineMeta({
  title: 'ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
});

const periods: ToggleGroupOption<string>[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Full month' },
];
const sizes: ToggleGroupSize[] = ['small', 'medium', 'large'];
</script>

<script lang="ts">
let period = $state('week');
let formats = $state<string[]>(['bold']);
let alignment = $state('left');
</script>

{#snippet calendar()}
  <CalendarIcon />
{/snippet}
{#snippet bold()}
  <BoldIcon />
{/snippet}
{#snippet italic()}
  <ItalicIcon />
{/snippet}
{#snippet underline()}
  <UnderlineIcon />
{/snippet}
{#snippet alignLeft()}
  <AlignLeftIcon />
{/snippet}
{#snippet alignCenter()}
  <AlignCenterIcon />
{/snippet}
{#snippet alignRight()}
  <AlignRightIcon />
{/snippet}

<Story name="Default" asChild>
  <ToggleGroup options={periods} bind:value={period} aria-label="Period" />
</Story>

<Story name="Group" asChild>
  <ToggleGroup
    options={periods}
    value="week"
    variant="group"
    aria-label="Period"
  />
</Story>

<Story name="Multiple" asChild>
  <ToggleGroup
    multiple
    bind:value={formats}
    label="Text formatting"
    options={[
      { value: 'bold', label: 'Bold', startAdornment: bold },
      { value: 'italic', label: 'Italic', startAdornment: italic },
      { value: 'underline', label: 'Underline', startAdornment: underline },
    ]}
  />
</Story>

<Story name="Multiple Group" asChild>
  <ToggleGroup
    multiple
    value={['bold', 'italic']}
    variant="group"
    size="icon"
    aria-label="Text formatting"
    options={[
      { value: 'bold', label: bold, ariaLabel: 'Bold', title: 'Bold' },
      { value: 'italic', label: italic, ariaLabel: 'Italic', title: 'Italic' },
      {
        value: 'underline',
        label: underline,
        ariaLabel: 'Underline',
        title: 'Underline',
      },
    ]}
  />
</Story>

<Story name="Icons and Tooltips" asChild>
  <ToggleGroup
    bind:value={alignment}
    size="icon"
    aria-label="Text alignment"
    options={[
      {
        value: 'left',
        label: alignLeft,
        ariaLabel: 'Left',
        title: 'Align left',
      },
      {
        value: 'center',
        label: alignCenter,
        ariaLabel: 'Center',
        title: 'Align center',
      },
      {
        value: 'right',
        label: alignRight,
        ariaLabel: 'Right',
        title: 'Align right',
      },
    ]}
  />
</Story>

<Story name="Sizes" asChild>
  <div style="display: grid; gap: var(--spacing-4);">
    {#each sizes as size}
      <ToggleGroup options={periods} value="week" {size} label={size} />
      <ToggleGroup
        options={periods}
        value="week"
        {size}
        variant="group"
        label={`${size} group`}
      />
    {/each}
  </div>
</Story>

<Story name="Label and Adornments" asChild>
  <ToggleGroup
    label="Reporting period"
    value="week"
    options={periods.map((option) => ({ ...option, startAdornment: calendar }))}
  />
</Story>

<Story name="Numeric Values" asChild>
  <ToggleGroup
    label="Items per page"
    value={25}
    options={[10, 25, 50].map((value) => ({ value, label: String(value) }))}
  />
</Story>

<Story name="Disabled" asChild>
  <div style="display: grid; gap: var(--spacing-4);">
    <ToggleGroup
      label="Disabled option"
      value="week"
      options={periods.map((option) => ({
        ...option,
        disabled: option.value === 'month',
      }))}
    />
    <ToggleGroup
      options={periods}
      value="week"
      disabled
      label="Disabled group"
    />
  </div>
</Story>

<Story name="Vertical" asChild>
  <ToggleGroup
    options={periods}
    value="week"
    orientation="vertical"
    aria-label="Period"
  />
</Story>

<Story name="Overflow" asChild>
  <div style="width: 200px;">
    <ToggleGroup
      aria-label="Period"
      value="week"
      options={[...periods, { value: 'year', label: 'Full year' }]}
    />
  </div>
</Story>
