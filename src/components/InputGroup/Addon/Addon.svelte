<script lang="ts">
import styles from './styles.css';
import type { InputGroupAddonProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  align = 'inline-start',
  ...restProps
}: InputGroupAddonProps = $props();

const classNames = $derived([styles.addon, styles.align[align], className]);

const focusControl = (element: HTMLElement | null) => {
  const control = element?.parentElement?.querySelector<
    HTMLInputElement | HTMLTextAreaElement
  >(
    'input[data-slot="input-group-control"], textarea[data-slot="input-group-control"]',
  );
  control?.focus();
};
</script>

<div
  bind:this={ref}
  role="group"
  data-slot="input-group-addon"
  data-align={align}
  class={classNames}
  onclick={(event) => {
		const target = event.target as HTMLElement | null;
		if (target?.closest('[data-slot="button"]')) {
			return;
		}
		focusControl(event.currentTarget as HTMLElement | null);
	}}
  {...restProps}
>
  {@render children?.()}
</div>
