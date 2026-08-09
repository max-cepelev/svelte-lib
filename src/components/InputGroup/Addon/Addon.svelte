<script lang="ts">
import styles from './styles.css';
import type { InputGroupAddonProps } from '../types';

let {
  ref = $bindable(null),
  class: className,
  children,
  align = 'inline-start',
  onpointerdown,
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

type PointerDownHandler = NonNullable<InputGroupAddonProps['onpointerdown']>;

const handlePointerDown: PointerDownHandler = (event) => {
  onpointerdown?.(event);
  if (event.defaultPrevented) return;

  const target = event.target;
  if (target instanceof Element && target.closest('[data-slot="button"]')) {
    return;
  }
  focusControl(event.currentTarget);
};
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change the addon's layout and form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="input-group-addon"
  data-align={align}
  class={classNames}
  onpointerdown={handlePointerDown}
  {...restProps}
>
  {@render children?.()}
</div>
