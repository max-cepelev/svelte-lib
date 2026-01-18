<script  module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { Card, Carousel, Typography } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'Carousel',
	component: Carousel.Root,
	tags: ['autodocs'],
	args: {
		onclick: fn(),
	},
});
</script>


<Story name="Default" asChild>
<Carousel.Root style="width: 100%; max-width: 400px;">
  <Carousel.Content>
    {#each Array(5), i}
      <Carousel.Item>
          <Card.Root>
            <Card.Content
              style="display: flex; align-items: center; justify-content: center; padding: 16px;"
            >
              <Typography variant="h3">{i + 1}</Typography>
            </Card.Content>
          </Card.Root>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
</Story>

