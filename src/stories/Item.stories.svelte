<script module lang="ts">
import { BadgeCheckIcon, ChevronRightIcon } from '@lucide/svelte';
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Item } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'Item',
  component: Item.Root,
  tags: ['autodocs'],
});
</script>

<Story name="Default" asChild>
  <div style="width: 400px; display: flex; gap: 8px; flex-direction: column">
    <Item.Root variant="outline">
      <Item.Content>
        <Item.Title>Basic Item</Item.Title>
        <Item.Description>
          A simple item with title and description.
        </Item.Description>
      </Item.Content>
      <Item.Actions>
        <Button variant="outline" size="small">Action</Button>
      </Item.Actions>
    </Item.Root>
    <Item.Root variant="outline" size="small">
      {#snippet child({ props })}
        <a href="#/" {...props}>
          <Item.Media>
            <BadgeCheckIcon size={16} />
          </Item.Media>
          <Item.Content>
            <Item.Title>Your profile has been verified.</Item.Title>
          </Item.Content>
          <Item.Actions>
            <ChevronRightIcon size={16} />
          </Item.Actions>
        </a>
      {/snippet}
    </Item.Root>
  </div>
</Story>
