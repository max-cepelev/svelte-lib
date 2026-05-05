<script lang="ts">
import { Typography } from '../../Typography';
import { getDescriptionContext } from '../context';
import * as styles from './styles.css';
import type { DescriptionNameProps } from '../types';

let {
  children,
  color = 'secondary',
  variant = 'body2',
  class: className,
}: DescriptionNameProps = $props();

const context = getDescriptionContext();
const leader = $derived(context.leader);
const direction = $derived(context.direction);

const showSeparator = $derived(!leader && direction !== 'column');
</script>

<dt
  class={[
		styles.wrapper,
		{ [styles.leader]: leader },
		className,
	]}
>
  <Typography {color} {variant} component="span">
    {@render children?.()}
  </Typography>
  {#if showSeparator}
    <span class="separator">{context.separator}</span>
  {/if}
</dt>
{#if leader}
  <div class={styles.dashedSeparator}></div>
{/if}

<style>
@media (max-width: 600px) {
  .separator {
    display: none;
  }
}
</style>
