<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { ArrowUp, Check, Info, Plus, Search } from '@lucide/svelte';
import { DropdownMenu, InputGroup, Separator, Tooltip } from '../components';

const { Story } = defineMeta({
  title: 'InputGroup',
  component: InputGroup.Root,
  tags: ['autodocs'],
});
</script>

<Story name="Examples" asChild>
  <div style:display="grid" style:gap="1.5rem" style:max-width="28rem">
    <InputGroup.Root>
      <InputGroup.Input placeholder="Search..." aria-label="Search" />
      <InputGroup.Addon>
        <Search />
      </InputGroup.Addon>
      <InputGroup.Addon align="inline-end">
        <InputGroup.Text>12 results</InputGroup.Text>
      </InputGroup.Addon>
    </InputGroup.Root>

    <InputGroup.Root>
      <InputGroup.Addon>
        <InputGroup.Text>https://</InputGroup.Text>
      </InputGroup.Addon>
      <InputGroup.Input placeholder="acme.com" aria-label="Domain" />
      <InputGroup.Addon align="inline-end">
        <Tooltip content="Extra context" side="top" arrow>
          <InputGroup.Button
            style="border-radius: 50%;"
            size="icon-xs"
            aria-label="Info"
            variant="ghost"
          >
            <Info />
          </InputGroup.Button>
        </Tooltip>
      </InputGroup.Addon>
    </InputGroup.Root>

    <InputGroup.Root>
      <InputGroup.Textarea placeholder="Ask, search or chat..." rows={3} />
      <InputGroup.Addon align="block-end">
        <InputGroup.Button variant="outline" size="icon-xs" aria-label="Add">
          <Plus />
        </InputGroup.Button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <InputGroup.Button {...props} variant="ghost">
                Auto
              </InputGroup.Button>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content side="top" align="start">
            <DropdownMenu.Item>Auto</DropdownMenu.Item>
            <DropdownMenu.Item>Agent</DropdownMenu.Item>
            <DropdownMenu.Item>Manual</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <InputGroup.Text style="margin-left: auto;">52% used</InputGroup.Text>
        <Separator orientation="vertical" style="height: 1.5rem;" />
        <InputGroup.Button
          disabled
          variant="default"
          size="icon-xs"
          aria-label="Send"
        >
          <ArrowUp />
        </InputGroup.Button>
      </InputGroup.Addon>
    </InputGroup.Root>

    <InputGroup.Root>
      <InputGroup.Input placeholder="@svelte" aria-label="Handle" />
      <InputGroup.Addon align="inline-end">
        <Check size={16} />
      </InputGroup.Addon>
    </InputGroup.Root>
  </div>
</Story>
