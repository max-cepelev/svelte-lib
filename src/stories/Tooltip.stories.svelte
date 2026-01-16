<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Tooltip } from '../index.js';

const { Story } = defineMeta({
	title: 'Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
});
</script>

{#snippet content()}
  <p style:max-width="200px">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, omnis quam! Enim fugit natus deserunt, soluta consequuntur accusamus maiores dicta tempora, similique sed illo, a suscipit quibusdam rem? Reiciendis, veritatis?</p>
{/snippet}


<Story name="Default" asChild>
  <div style:display="grid" style:place-items="center" style:width="400px" style:height="400px" >
    <Tooltip
      content={content}
      arrow
      side='right'
      delayDuration={200}
    >
      <Button variant='outline'>Hover</Button>
    </Tooltip>
  </div>
</Story>



<Story name="Top" asChild>
  <div style:display="grid" style:place-items="center" style:width="400px" style:height="400px" >
    <Tooltip
      content='Top tooltip'
			delayDuration={100}
			side='top'
      arrow
		>
			<Button variant='outline'>Hover</Button>
		</Tooltip></div>
</Story>

<Story name="Bottom" asChild>
  <div style:display="grid" style:place-items="center" style:width="400px" style:height="400px" >
    <Tooltip
      content='Bottom tooltip'
			delayDuration={100}
			side='bottom'
      arrow
		>
			<Button variant='outline'>Hover</Button>
		</Tooltip></div>
</Story>

<Story name="Left" asChild>
  <div style:display="grid" style:place-items="center" style:width="400px" style:height="400px" >
    <Tooltip
      content='Left tooltip'
			delayDuration={100}
			side='left'
      arrow
		>
			<Button variant='outline'>Hover</Button>
		</Tooltip></div>
</Story>

<Story name="Right" asChild>
  <div style:display="grid" style:place-items="center" style:width="400px" style:height="400px" >
    <Tooltip
      content='Right tooltip'
			delayDuration={100}
			side='right'
      arrow
		>
			<Button variant='outline'>Hover</Button>
		</Tooltip></div>
</Story>



