<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Empty } from '../components/index.js';
import { ArrowUpRightIcon, FolderCodeIcon } from '@lucide/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'Empty',
  component: Empty.Root,
  tags: ['autodocs'],
});
</script>

<Story name="Default" asChild>
  <Empty.Root>
    <Empty.Header>
      <Empty.Media variant="icon">
        <FolderCodeIcon />
      </Empty.Media>
      <Empty.Title>No Projects Yet</Empty.Title>
      <Empty.Description>
        You haven't created any projects yet. Get started by creating your first
        project.
      </Empty.Description>
    </Empty.Header>
    <Empty.Content>
      <div style="display: flex; gap: 8px;">
        <Button>Create Project</Button>
        <Button variant="outline">Import Project</Button>
      </div>
    </Empty.Content>
    <Button variant="link" href="#/" size="small">
      Learn More <ArrowUpRightIcon size={16} />
    </Button>
  </Empty.Root>
</Story>
