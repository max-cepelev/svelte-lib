<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { Accordion } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
  args: {
    onclick: fn(),
  },
});
</script>

<Story name="Example" asChild>
  <Accordion.Root
    type="single"
    style="width: 100%; max-width: 600px;height: 100%;"
    value="item-1"
  >
    <Accordion.Item value="item-1">
      <Accordion.Trigger>Product Information</Accordion.Trigger>
      <Accordion.Content>
        <p>
          Our flagship product combines cutting-edge technology with sleek
          design. Built with premium materials, it offers unparalleled
          performance and reliability.
        </p>
        <p>
          Key features include advanced processing capabilities, and an
          intuitive user interface designed for both beginners and experts.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-2">
      <Accordion.Trigger>Shipping Details</Accordion.Trigger>
      <Accordion.Content>
        <p>
          We offer worldwide shipping through trusted courier partners. Standard
          delivery takes 3-5 business days, while express shipping ensures
          delivery within 1-2 business days.
        </p>
        <p>
          All orders are carefully packaged and fully insured. Track your
          shipment in real-time through our dedicated tracking portal.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="item-3">
      <Accordion.Trigger>Return Policy</Accordion.Trigger>
      <Accordion.Content>
        <p>
          We stand behind our products with a comprehensive 30-day return
          policy. If you&apos;re not completely satisfied, simply return the
          item in its original condition.
        </p>
        <p>
          Our hassle-free return process includes free return shipping and full
          refunds processed within 48 hours of receiving the returned item.
        </p>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</Story>
