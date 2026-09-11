<script lang="ts">
import { Badge, Button, Card, Select, Separator, Tabs } from './components';
import './theme.css';

const longSelectItems = [
  {
    value: 'long-label',
    label: 'A selected option with a label wider than its trigger',
  },
];

let longSelectValue = $state(['long-label']);
</script>

<Tabs.Root class="consumer-tabs" value="first">
  <Tabs.List>
    <Tabs.Trigger value="first">First</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="first">Content</Tabs.Content>
</Tabs.Root>

<Button class="consumer-button" size="icon" variant="outline">Button</Button>
<Button class="consumer-link" href="/example" size="icon" variant="link">
  Link
</Button>
<Badge class="consumer-badge">Badge</Badge>
<Separator data-testid="separator" />

<Select.Root
  type="multiple"
  items={longSelectItems}
  bind:value={longSelectValue}
>
  <Select.Trigger class="long-select-trigger" data-testid="long-select-trigger">
    <Select.Value />
  </Select.Trigger>
</Select.Root>

<Card.Root class="consumer-card">
  <Card.Content>Card</Card.Content>
</Card.Root>

<style>
:global(.consumer-tabs) {
  display: grid;
  gap: 31px;
}

:global(.consumer-button) {
  position: absolute;
  width: 41px;
}

:global(.consumer-badge) {
  background-color: rgb(1, 2, 3);
}

:global(.consumer-card) {
  display: grid;
  padding: 13px;
}

:global(.long-select-trigger) {
  width: 160px;
}
</style>
