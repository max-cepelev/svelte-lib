<script lang="ts">
import { setDescriptionContext } from './context';
import * as styles from './styles.css';
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
		styles.wrapper,
		styles.direction[direction],
		styles.justify[justifyContent],
		className,
	]}
>
  {@render children?.()}
</svelte:element>
