<script lang="ts">
import ToggleGroup from './ToggleGroup.svelte';
import '../../theme.css';

let value = $state('week');
let values = $state<number[]>([10]);
</script>

{#snippet prefix()}
  <span data-testid="prefix">Start</span>
{/snippet}
{#snippet suffix()}
  <span data-testid="suffix">End</span>
{/snippet}
{#snippet customLabel()}
  <span>Custom</span>
{/snippet}

<ToggleGroup
  bind:value
  label="Period"
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Full month' },
  ]}
/>
<output aria-label="Selected period">{value}</output>
<button type="button" onclick={() => (value = 'month')}>
  Select month externally
</button>

<ToggleGroup
  multiple
  bind:value={values}
  label="Numbers"
  options={[
    { value: 10, label: 'Ten' },
    { value: 25, label: 'Twenty five' },
  ]}
/>
<output aria-label="Selected numbers">{values.join(',')}</output>

<ToggleGroup
  label="Snippets"
  options={[
    {
      value: 'custom',
      label: customLabel,
      startAdornment: prefix,
      endAdornment: suffix,
      ariaLabel: 'Custom option',
      title: 'Option details',
    },
  ]}
/>
