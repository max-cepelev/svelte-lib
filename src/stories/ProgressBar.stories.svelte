<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { ProgressBar, Typography } from '../lib/components';

const { Story } = defineMeta({
  title: 'ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});
</script>

<Story name="Demo" asChild>
  <div style="display: grid; gap: 16px; width: 360px">
    {#each [0, 25, 50, 75, 100] as value (value)}
      <div style="display: grid; gap: 6px">
        <Typography variant="caption" color="secondary">{value}%</Typography>
        <ProgressBar {value} aria-label="Прогресс: {value}%" />
      </div>
    {/each}
  </div>
</Story>

<Story name="Clamped Value" asChild>
  <div style="width: 360px">
    <ProgressBar value={140} aria-label="Завершено" />
  </div>
</Story>
