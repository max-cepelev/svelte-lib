<script lang="ts">
import { Tabs } from './index';
import type { TabsProps, TabsVariant } from './types';
import '../../theme.css';

let {
  variant = 'default',
  orientation = 'horizontal',
  value = $bindable('account'),
  passwordLabel = 'Password',
  width,
}: {
  variant?: TabsVariant;
  orientation?: TabsProps['orientation'];
  value?: string;
  passwordLabel?: string;
  width?: number;
} = $props();
</script>

<Tabs.Root
  bind:value
  {orientation}
  style={width === undefined ? undefined : `width: ${width}px;`}
>
  <Tabs.List {variant} aria-label="Settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="password">{passwordLabel}</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account settings</Tabs.Content>
  <Tabs.Content value="password">Password settings</Tabs.Content>
</Tabs.Root>
