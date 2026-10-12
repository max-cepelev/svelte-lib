<script module lang="ts">
import { BellIcon, LockIcon, UserIcon } from '@lucide/svelte';
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Tabs, type TabsVariant } from '../lib/components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
});
</script>

{#snippet content(text: string)}
  <div
    style="width: 420px; min-height: 160px; padding: var(--spacing-4); border: 1px solid var(--colors-border); border-radius: var(--radius-medium);"
  >
    {text}
  </div>
{/snippet}

{#snippet tabContents()}
  <Tabs.Content value="account">
    {@render content('Manage your account details.')}
  </Tabs.Content>
  <Tabs.Content value="password">
    {@render content('Update your password and security settings.')}
  </Tabs.Content>
  <Tabs.Content value="notifications">
    {@render content('Configure your notification preferences.')}
  </Tabs.Content>
{/snippet}

{#snippet tabList(variant: TabsVariant = 'default')}
  <Tabs.List {variant}>
    <Tabs.Trigger value="account">
      <UserIcon />
      Account
    </Tabs.Trigger>
    <Tabs.Trigger value="password">
      <LockIcon />
      Password
    </Tabs.Trigger>
    <Tabs.Trigger value="notifications">
      <BellIcon />
      Notifications
    </Tabs.Trigger>
  </Tabs.List>
{/snippet}

<Story name="Default" asChild>
  <Tabs.Root value="account">
    {@render tabList()}
    {@render tabContents()}
  </Tabs.Root>
</Story>

<Story name="Line" asChild>
  <Tabs.Root value="account">
    {@render tabList('line')}
    {@render tabContents()}
  </Tabs.Root>
</Story>

<Story name="Vertical" asChild>
  <Tabs.Root value="account" orientation="vertical">
    {@render tabList()}
    {@render tabContents()}
  </Tabs.Root>
</Story>

<Story name="Vertical Line" asChild>
  <Tabs.Root value="account" orientation="vertical">
    {@render tabList('line')}
    {@render tabContents()}
  </Tabs.Root>
</Story>

<Story name="Disabled" asChild>
  <Tabs.Root value="account">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password" disabled>Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      {@render content('Account tab is active.')}
    </Tabs.Content>
    <Tabs.Content value="password">
      {@render content('Password tab is disabled.')}
    </Tabs.Content>
  </Tabs.Root>
</Story>

<Story name="Overflow" asChild>
  <div style="width: 280px">
    <Tabs.Root value="billing">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        <Tabs.Trigger value="integrations">Integrations</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </div>
</Story>
