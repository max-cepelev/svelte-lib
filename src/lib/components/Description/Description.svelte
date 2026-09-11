<script lang="ts">
import { setDescriptionContext } from './context';

import type { DescriptionProps } from './types';

let {
  children,
  justifyContent = 'start',
  leader = false,
  separator = ':',
  component = 'dl',
  direction = 'default',
  class: className,
}: DescriptionProps = $props();

setDescriptionContext({
  get leader() {
    return leader;
  },
  get separator() {
    return separator;
  },
  get direction() {
    return direction;
  },
});
</script>

<svelte:element
  this={component}
  class={[
		"wrapper",
		`direction-${direction}`,
		`justify-${justifyContent}`,
		className,
	]}
>
  {@render children?.()}
</svelte:element>

<style>
@layer max-ts-svelte-components {
  .wrapper {
    display: flex;
    height: max-content;
    margin: 0;
  }
  .direction-default {
    flex-direction: row;
  }
  .direction-column {
    flex-direction: column;
  }
  .direction-row {
    flex-direction: row;
    align-items: center;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-space-between {
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    .direction-default {
      flex-direction: column;
    }
  }
}
</style>
