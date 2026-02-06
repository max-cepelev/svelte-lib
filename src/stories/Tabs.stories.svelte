<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Card, Input, Label, Tabs } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'Tabs',
  component: Tabs.Root,
  tags: ['autodocs'],
});
</script>

<Story name="Default" asChild>
  <div style="margin: 16px auto; width: 100%; max-width: 400px">
    <Tabs.Root value="account">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">
        <Card.Root>
          <Card.Header>
            <Card.Title>Account</Card.Title>
            <Card.Description>
              Make changes to your account here. Click save when you&apos;re
              done.
            </Card.Description>
          </Card.Header>
          <Card.Content style="display: grid; gap: 24px;">
            <div style="display: grid; gap: 16px;">
              <Label for="tabs-demo-name">Name</Label>
              <Input id="tabs-demo-name" value="Pedro Duarte" />
            </div>
            <div style="display: grid; gap: 16px;">
              <Label for="tabs-demo-username">Username</Label>
              <Input id="tabs-demo-username" value="@peduarte" />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button>Save changes</Button>
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="password">
        <Card.Root>
          <Card.Header>
            <Card.Title>Password</Card.Title>
            <Card.Description>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </Card.Description>
          </Card.Header>
          <Card.Content style="display: grid; gap: 24px;">
            <div style="display: grid; gap: 16px;">
              <Label for="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div style="display: grid; gap: 16px;">
              <Label for="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </Card.Content>
          <Card.Footer>
            <Button>Save password</Button>
          </Card.Footer>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</Story>
