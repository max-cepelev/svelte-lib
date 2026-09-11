<script lang="ts">
import type { ButtonProps } from './types';

let {
  ref = $bindable(null),
  variant = 'default',
  size = 'medium',
  type = 'button',
  href = undefined,
  children,
  loading = false,
  fullWidth = false,
  class: className,
  disabled,
  ...restProps
}: ButtonProps = $props();

const classNames = $derived([
  'button',
  {
    loading: loading,
    'full-width': fullWidth,
  },
  className,
]);
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    data-variant={variant}
    data-size={size}
    class={classNames}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : undefined}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    data-variant={variant}
    data-size={size}
    aria-disabled={disabled}
    class={classNames}
    {type}
    {disabled}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}

<style>
@layer max-ts-svelte-components {
  .button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    border-radius: var(--radius-medium);
    border-width: 0;
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--fontWeight-medium);
    transition: background-color 0.2s;
    cursor: pointer;
    line-height: 100%;
    position: relative;
    &:disabled {
      pointer-events: none;
      opacity: 0.6;
    }
    &:focus-visible {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: var(--elevation-1);
    }

    &[data-variant="default"] {
      background-color: var(--colors-primary);
      color: var(--colors-foreground-primary);
      &:hover {
        background-color: color-mix(
          in oklch,
          var(--colors-primary) 85%,
          transparent
        );
      }
    }

    &[data-variant="destructive"] {
      background-color: var(--colors-error);
      color: var(--colors-foreground-primary);
      &:hover {
        background-color: color-mix(
          in oklch,
          var(--colors-error) 85%,
          transparent
        );
      }
    }

    &[data-variant="outline"] {
      border: 1px solid var(--colors-border);
      background-color: var(--colors-background-paper);
      color: var(--colors-text-primary);
      &:hover {
        background-color: var(--colors-background-elementHover);
      }
    }

    &[data-variant="ghost"] {
      background-color: transparent;
      color: var(--colors-text-primary);
      &:hover {
        background-color: var(--colors-background-elementHover);
      }
    }

    &[data-variant="link"] {
      background-color: transparent;
      color: var(--colors-primary);
      text-underline-offset: 4px;
      &:hover {
        text-decoration-line: underline;
      }
    }

    &[data-size="small"] {
      height: var(--spacing-7);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--radius-small);
      font-size: var(--fontSize-sm);
    }
    &[data-size="medium"] {
      height: var(--spacing-9);
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--fontSize-base);
    }
    &[data-size="large"] {
      height: var(--spacing-10);
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--fontSize-lg);
    }
    &[data-size="icon"] {
      height: var(--spacing-9);
      width: var(--spacing-9);
    }
    &[data-size="iconSmall"] {
      height: var(--spacing-7);
      width: var(--spacing-7);
    }
    &[data-size="icon"] :global(svg) {
      width: var(--spacing-6);
      height: var(--spacing-6);
    }
    &[data-size="iconSmall"] :global(svg) {
      width: var(--spacing-4);
      height: var(--spacing-4);
    }
  }

  .loading {
    pointer-events: none;
    opacity: 0.6;
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border-width: 2px;
      border-style: solid;
      border-bottom-color: transparent;
      animation: spin 1s linear infinite;
      z-index: 2;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: inherit;
      z-index: 1;
    }
  }

  .full-width {
    width: 100%;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
