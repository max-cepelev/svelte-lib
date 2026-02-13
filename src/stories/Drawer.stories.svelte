<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Drawer, Input, Label } from '../components';

const { Story } = defineMeta({
  title: 'Drawer',
  component: Drawer.Root,
  tags: ['autodocs'],
});
</script>

<Story name="GoalSetter" asChild>
  <Drawer.Root>
    <Drawer.Trigger>Open Drawer</Drawer.Trigger>
    <Drawer.Content showCloseButton>
      <div style="margin: 0 auto; width: 100%; max-width: 460px;">
        <Drawer.Header>
          <Drawer.Title>Move Goal</Drawer.Title>
          <Drawer.Description>
            Define a daily activity target.
          </Drawer.Description>
        </Drawer.Header>
        <div style="padding: 0 16px 16px; display: grid; gap: 16px;">
          <div
            style="display: flex; align-items: center; justify-content: center; gap: 12px;"
          >
            <Button
              variant="outline"
              size="icon"
              style="border-radius: 9999px;"
            >
              −
            </Button>
            <div style="text-align: center;">
              <div style="font-size: 56px; font-weight: 700; line-height: 1;">
                340
              </div>
              <div
                style="font-size: 12px; text-transform: uppercase; color: oklch(0.37 0.03 260);"
              >
                Calories / day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              style="border-radius: 9999px;"
            >
              +
            </Button>
          </div>
          <div style="display: grid; gap: 8px;">
            <Label for="goal-notes">Notes</Label>
            <Input id="goal-notes" placeholder="Add an optional description" />
          </div>
        </div>
        <Drawer.Footer>
          <Button>Submit</Button>
          <Drawer.Close>
            {#snippet child({ props })}
              <Button {...props} variant="outline">Cancel</Button>
            {/snippet}
          </Drawer.Close>
        </Drawer.Footer>
      </div>
    </Drawer.Content>
  </Drawer.Root>
</Story>

<Story name="ProfileForm" asChild>
  <Drawer.Root>
    <Drawer.Trigger>
      <Button variant="outline">Edit Profile</Button>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description>
          Update your contact information and save the changes.
        </Drawer.Description>
      </Drawer.Header>
      <form style="display: grid; gap: 16px; padding: 0 16px;">
        <div style="display: grid; gap: 8px;">
          <Label for="drawer-email">Email</Label>
          <Input id="drawer-email" type="email" value="jane@example.com" />
        </div>
        <div style="display: grid; gap: 8px;">
          <Label for="drawer-username">Username</Label>
          <Input id="drawer-username" value="@janedoe" />
        </div>
        <div style="display: grid; gap: 8px;">
          <Label for="drawer-location">Location</Label>
          <Input id="drawer-location" placeholder="City, Country" />
        </div>
      </form>
      <Drawer.Footer>
        <Drawer.Close>
          {#snippet child({ props })}
            <Button {...props} variant="outline">Cancel</Button>
          {/snippet}
        </Drawer.Close>
        <Button type="submit">Save changes</Button>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
</Story>
