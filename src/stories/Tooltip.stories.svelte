<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Tooltip } from '../components';

const { Story } = defineMeta({
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
});

const gridItems = Array.from({ length: 30 }, (_, i) => i + 1);
</script>

{#snippet content()}
  <p style:max-width="200px">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, omnis quam!
    Enim fugit natus deserunt, soluta consequuntur accusamus maiores dicta
    tempora, similique sed illo, a suscipit quibusdam rem? Reiciendis,
    veritatis?
  </p>
{/snippet}

<Story name="Default" asChild>
  <div
    style:display="grid"
    style:place-items="center"
    style:width="400px"
    style:height="400px"
  >
    <Tooltip arrow {content} placement="right" delayDuration={200}>
      <Button variant="outline">Hover</Button>
    </Tooltip>
  </div>
</Story>

<Story name="Top" asChild>
  <div
    style:display="grid"
    style:place-items="center"
    style:width="400px"
    style:height="400px"
  >
    <Tooltip content="Top tooltip" delayDuration={100} placement="top" arrow>
      <Button variant="outline">Hover</Button>
    </Tooltip>
  </div>
</Story>

<Story name="Bottom" asChild>
  <div
    style:display="grid"
    style:place-items="center"
    style:width="400px"
    style:height="400px"
  >
    <Tooltip
      content="Bottom tooltip"
      delayDuration={100}
      placement="bottom"
      arrow
    >
      <Button variant="outline">Hover</Button>
    </Tooltip>
  </div>
</Story>

<Story name="Left" asChild>
  <div
    style:display="grid"
    style:place-items="center"
    style:width="400px"
    style:height="400px"
  >
    <Tooltip content="Left tooltip" delayDuration={100} placement="left" arrow>
      <Button variant="outline">Hover</Button>
    </Tooltip>
  </div>
</Story>

<Story name="Right" asChild>
  <div
    style:display="grid"
    style:place-items="center"
    style:width="400px"
    style:height="400px"
  >
    <Tooltip
      content="Right tooltip"
      delayDuration={100}
      placement="right"
      arrow
    >
      <Button variant="outline">Hover</Button>
    </Tooltip>
  </div>
</Story>

<Story name="Tooltip Grid / Hover Stress" asChild>
  <div
    style:display="grid"
    style:grid-template-columns="repeat(6, minmax(0, 1fr))"
    style:gap="12px"
    style:padding="16px"
    style:width="760px"
  >
    {#each gridItems as id}
      <Tooltip
        content={`Tooltip #${id}`}
        delayDuration={80}
        placement="top"
        arrow
      >
        <Button variant="outline"> Item {id} </Button>
      </Tooltip>
    {/each}
  </div>
</Story>
