<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Checkbox, Input, Label } from '../components';

const { Story } = defineMeta({
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
});
</script>

<Story name="Default" asChild>
  <div style:display="flex" style:align-items="center" style:gap="4px">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</Story>

<Story name="With Required Input" asChild>
  <div style:display="flex" style:flex-direction="column" style:gap="8px">
    <Label required for="email-input"> Email </Label>
    <Input
      id="email-input"
      type="email"
      placeholder="email@example.com"
      required
    />
    <Label>
      Name (optional)
      <Input type="text" placeholder="John Doe" />
    </Label>
  </div>
</Story>
