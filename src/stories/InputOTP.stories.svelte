<script module lang="ts">
import { defineMeta } from '@storybook/addon-svelte-csf';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui';
import { InputOTP } from '../components';

const { Story } = defineMeta({
  title: 'InputOTP',
  component: InputOTP.Root,
  tags: ['autodocs'],
});

let value = $state('');
</script>

<Story name="Default" asChild>
  <InputOTP.Root maxlength={6}>
    {#snippet children(_args)}
      <InputOTP.Group>
        {#each _args.cells.slice(0, 3) as cell, index (index)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        {#each _args.cells.slice(3, 6) as cell, index (index)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
</Story>

<Story name="Controlled" asChild>
  <InputOTP.Root maxlength={6} bind:value>
    {#snippet children(_args)}
      <InputOTP.Group>
        {#each _args.cells as cell, index (index)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
</Story>

<Story name="Invalid" asChild>
  <InputOTP.Root maxlength={6} aria-invalid>
    {#snippet children(_args)}
      <InputOTP.Group>
        {#each _args.cells.slice(0, 3) as cell, index (index)}
          <InputOTP.Slot aria-invalid {cell} />
        {/each}
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        {#each _args.cells.slice(3, 6) as cell, index (index)}
          <InputOTP.Slot aria-invalid {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
</Story>

<Story name="Pattern" asChild>
  <InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
    {#snippet children(_args)}
      <InputOTP.Group>
        {#each _args.cells as cell, index (index)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
</Story>
