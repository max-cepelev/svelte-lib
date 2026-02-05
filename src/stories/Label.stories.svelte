<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Checkbox, Label } from '../components/index.js';

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
