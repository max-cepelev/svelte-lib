<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Dialog, Input, Label } from '../components';

const { Story } = defineMeta({
  title: 'Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],
});
</script>

<Story name="EditProfile" asChild>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="outline">Open Dialog</Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
      </Dialog.Header>
      <div style="display: grid; gap: 12px;">
        <div style="display: grid; gap: 8px;">
          <Label for="name">Name</Label>
          <Input id="name" name="name" value="Pedro Duarte" />
        </div>
        <div style="display: grid; gap: 8px;">
          <Label for="username">Username</Label>
          <Input id="username" name="username" value="@peduarte" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} variant="outline">Cancel</Button>
          {/snippet}
        </Dialog.Close>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</Story>

<Story name="ShareLink" asChild>
  <Dialog.Root>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="outline">Share</Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Share link</Dialog.Title>
        <Dialog.Description>
          Anyone who has this link will be able to view it.
        </Dialog.Description>
      </Dialog.Header>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="display: grid; gap: 8px; flex: 1; position: relative;">
          <Label
            for="share-link"
            style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;"
          >
            Link
          </Label>
          <Input
            id="share-link"
            value="https://shadcn-svelte.com/docs/installation"
            readonly
          />
        </div>
      </div>
      <Dialog.Footer style="justify-content: flex-start;">
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props}>Close</Button>
          {/snippet}
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</Story>
