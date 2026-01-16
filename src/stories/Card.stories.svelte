<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Card, Input, Label } from '../index.js';

const { Story } = defineMeta({
	title: 'Card',
	component: Card.Root,
	tags: ['autodocs'],
});
</script>


<Story name="Example" asChild>
  <Card.Root style="margin: 16px auto; width: 100%; max-width: 400px">
    <Card.Header>
      <Card.Title>Login to your account</Card.Title>
      <Card.Description
        >Enter your email below to login to your account</Card.Description
      >
      <Card.Action>
        <Button variant="link">Sign Up</Button>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <form>
        <div style="display: flex; flex-direction: column; gap: 20px">
          <div style="display: grid; gap: 8px">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div style="display: grid; gap: 8px">
            <div style="display: flex; justify-content: space-between;">
              <Label for="password">Password</Label>
              <Button
                size='small'
                href="##"
                variant='link'
              >
                Forgot your password?
              </Button>
            </div>
            <Input id="password" type="password" required />
          </div>
        </div>
      </form>
    </Card.Content>
    <Card.Footer style="flex-direction: column; gap: 8px">
      <Button style="width: 100%;" type="submit">Login</Button>
      <Button variant="outline" style="width: 100%;">Login with Google</Button>
    </Card.Footer>
  </Card.Root>
</Story>


