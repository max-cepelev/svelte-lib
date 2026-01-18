<script  module lang="ts">
import {
	Archive,
	ArrowLeft,
	CalendarPlus,
	Clock,
	ListFilter,
	MailCheck,
	MoreHorizontal,
	Tag,
	Trash2,
} from '@lucide/svelte';
import { defineMeta } from '@storybook/addon-svelte-csf';
import { fn } from 'storybook/test';
import { Button, ButtonGroup, DropdownMenu } from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: 'ButtonGroup',
	component: ButtonGroup.Root,
	tags: ['autodocs'],
	args: {
		onclick: fn(),
	},
});

let label = $state('personal');
</script>


<Story name="Default" asChild>
<ButtonGroup.Root>
  <ButtonGroup.Root >
    <Button variant="outline" size="iconSmall" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="small" variant="outline">Archive</Button>
    <Button size="small" variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="small" variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="iconSmall"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
</Story>

