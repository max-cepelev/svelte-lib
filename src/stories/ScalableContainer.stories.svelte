<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { ScalableContainer, Typography, Card } from '../components';

const { Story } = defineMeta({
  title: 'ScalableContainer',
  component: ScalableContainer,
  tags: ['autodocs'],
  args: {
    onScaleChanged: fn(),
    onPositionChanged: fn(),
  },
});
</script>

<Story name="Default" asChild>
  <div style="width: 100%; height: 500px; border: 1px solid #ccc;">
    <ScalableContainer showToolbar={true}>
      <Card.Root style="width: 300px; padding: 24px;">
        <Typography variant="h3">Scalable Content</Typography>
        <Typography variant="body2" style="margin-top: 8px;">
          Drag to move, scroll or pinch to zoom. Use toolbar buttons for
          additional controls.
        </Typography>
      </Card.Root>
    </ScalableContainer>
  </div>
</Story>

<Story name="Without Toolbar" asChild>
  <div style="width: 100%; height: 500px; border: 1px solid #ccc;">
    <ScalableContainer showToolbar={false}>
      <Card.Root style="width: 300px; padding: 24px;">
        <Typography variant="h3">No Toolbar</Typography>
        <Typography variant="body2" style="margin-top: 8px;">
          Drag to move, scroll or pinch to zoom. No toolbar buttons available.
        </Typography>
      </Card.Root>
    </ScalableContainer>
  </div>
</Story>

<Story name="Custom Scale Limits" asChild>
  <div style="width: 100%; height: 500px; border: 1px solid #ccc;">
    <ScalableContainer
      showToolbar={true}
      initialScale={1}
      minScale={0.5}
      maxScale={3}
    >
      <Card.Root style="width: 300px; padding: 24px;">
        <Typography variant="h3">Custom Scale Limits</Typography>
        <Typography variant="body2" style="margin-top: 8px;">
          Min scale: 0.5, Max scale: 3. Try zooming to see the limits.
        </Typography>
      </Card.Root>
    </ScalableContainer>
  </div>
</Story>

<Story name="With Callbacks" asChild>
  <div style="width: 100%; height: 500px; border: 1px solid #ccc;">
    <ScalableContainer
      showToolbar={true}
      onScaleChanged={(scale) => console.log('Scale changed:', scale)}
      onPositionChanged={(position) => console.log('Position changed:', position)}
    >
      <Card.Root style="width: 300px; padding: 24px;">
        <Typography variant="h3">With Callbacks</Typography>
        <Typography variant="body2" style="margin-top: 8px;">
          Open console to see scale and position changes.
        </Typography>
      </Card.Root>
    </ScalableContainer>
  </div>
</Story>
