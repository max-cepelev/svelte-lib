<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { Card, Carousel, Typography } from '../components';

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
          <Card.Root style="height: 400px;">
            <Card.Content
              style="display: flex; height: 100%; align-items: center; justify-content: center; padding: 16px;"
            >
              <Typography variant="h3">{i + 1}</Typography>
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Arrows />
    <Carousel.Dots />
  </Carousel.Root>
</Story>

<Story name="Mobile center swipe" asChild>
  <div style="width: 100%; max-width: 360px; margin: 0 auto; padding: 0 8px;">
    <Carousel.Root style="width: 100%;">
      <Carousel.Content>
        {#each Array(6), i}
          <Carousel.Item>
            <Card.Root style="height: 220px;">
              <Card.Content
                style="display: flex; height: 100%; align-items: center; justify-content: center; padding: 16px;"
              >
                <Typography variant="h4">Slide {i + 1}</Typography>
              </Card.Content>
            </Card.Root>
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Arrows />
      <Carousel.Dots />
    </Carousel.Root>
  </div>
</Story>

<Story name="Vertical" asChild>
  <Carousel.Root
    orientation="vertical"
    align="start"
    style="width: 100%; max-width: 400px; height: 320px;"
  >
    <Carousel.Content>
      {#each Array(5), i}
        <Carousel.Item>
          <Card.Root style="width: 100%; height: 100%;">
            <Card.Content
              style="height: 100%; display: flex; align-items: center; justify-content: center; padding: 16px;"
            >
              <Typography variant="h3">{i + 1}</Typography>
            </Card.Content>
          </Card.Root>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Arrows />
    <Carousel.Dots />
  </Carousel.Root>
</Story>
