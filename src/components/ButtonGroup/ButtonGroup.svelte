<script lang="ts">
import styles from './styles.css';
import type { ButtonGroupProps } from './types';

let {
  ref = $bindable(null),
  class: className,
  children,
  orientation = 'horizontal',
  ...restProps
}: ButtonGroupProps = $props();

const classNames = $derived([
  styles.container,
  styles.orientation[orientation],
  className,
]);
</script>

<!-- biome-ignore lint/a11y/useSemanticElements: A fieldset would change the component's layout and form semantics. -->
<div
  bind:this={ref}
  role="group"
  data-slot="button-group"
  data-orientation={orientation}
  class={classNames}
  {...restProps}
>
  {@render children?.()}
</div>
