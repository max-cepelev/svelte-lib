<script lang="ts">
import { Badge, Button, Card, Separator, Tabs } from './components';
import './theme.css';
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
</style>
