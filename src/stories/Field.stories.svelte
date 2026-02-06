<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Button, Checkbox, Field, Input } from '../components';

const { Story } = defineMeta({
  title: 'Field',
  component: Field.Item,
  tags: ['autodocs'],
});
</script>

<Story name="Example" asChild>
  <div style="width: 100%;max-width: 400px">
    <form>
      <Field.Group>
        <Field.Set>
          <Field.Legend>Payment Method</Field.Legend>
          <Field.Description>
            All transactions are secure and encrypted
          </Field.Description>
          <Field.Group>
            <Field.Item>
              <Field.Label for="checkout-7j9-card-name-43j">
                Name on Card
              </Field.Label>
              <Input
                id="checkout-7j9-card-name-43j"
                placeholder="John Doe"
                required
              />
              <Field.Error errors={[{ message: 'Name is required' }]} />
            </Field.Item>
            <div
              style="display: grid; gap: 1rem; grid-template-columns: repeat(3, 1fr);"
            >
              <Field.Item style="grid-column: span 2;">
                <Field.Label for="checkout-7j9-card-number-uw1">
                  Card Number
                </Field.Label>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <Field.Description>
                  Enter your 16-digit number.
                </Field.Description>
              </Field.Item>
              <Field.Item style="grid-column: span 1;">
                <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
                <Input id="checkout-7j9-cvv" placeholder="123" required />
              </Field.Item>
            </div>
          </Field.Group>
        </Field.Set>
        <Field.Separator />
        <Field.Set>
          <Field.Legend>Billing Address</Field.Legend>
          <Field.Description>
            The billing address associated with your payment method
          </Field.Description>
          <Field.Group>
            <Field.Item orientation="horizontal">
              <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
              <Field.Label
                for="checkout-7j9-same-as-shipping-wgm"
                class="font-normal"
              >
                Same as shipping address
              </Field.Label>
            </Field.Item>
          </Field.Group>
        </Field.Set>
        <Field.Separator />
        <Field.Item orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </Field.Item>
      </Field.Group>
    </form>
  </div>
</Story>
