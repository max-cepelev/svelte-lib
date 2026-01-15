<script lang="ts" module>
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from '@lucide/svelte';
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Alert } from '~/components/index.js';

const { Story } = defineMeta({
	title: 'Alert',
	component: Alert.Root,
	tags: ['autodocs'],
});
</script>


<Story name="Example" asChild>
  <div style="display: grid; gap: 16px; width: 100%; max-width: 400px; align-items: start">
    <Alert.Root variant="success">
      <CheckCircle2Icon />
      <Alert.Title>Success! Your changes have been saved</Alert.Title>
      <Alert.Description
        >This is an alert with icon, title and description.</Alert.Description
      >
    </Alert.Root>
    <Alert.Root>
      <PopcornIcon />
      <Alert.Title
        >This Alert has a title and an icon. No description.</Alert.Title
      >
    </Alert.Root>
    <Alert.Root variant="error">
      <AlertCircleIcon />
      <Alert.Title>Unable to process your payment.</Alert.Title>
      <Alert.Description>
        <p>Please verify your billing information and try again.</p>
        <ul class="list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </Alert.Description>
    </Alert.Root>
    <Alert.Root variant="warning">
      <PopcornIcon />
      <Alert.Title
        >This Alert has a title and an icon. No description.</Alert.Title
      >
    </Alert.Root>
  </div>
</Story>


