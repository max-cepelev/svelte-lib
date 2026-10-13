<script lang="ts">
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonAlertIcon,
  TriangleAlertIcon,
} from '@lucide/svelte';
import { Toaster } from 'svelte-sonner';
import { NOTIFICATION_POSITIONS } from '../constants';
import type { NotificationContainerProps } from './types';

let { position = 'bottomRight', ...restProps }: NotificationContainerProps =
  $props();
</script>

{#snippet errorIcon()}
  <span class="icon error"><OctagonAlertIcon size={20} /></span>
{/snippet}
{#snippet successIcon()}
  <span class="icon success"><CircleCheckIcon size={20} /></span>
{/snippet}
{#snippet warningIcon()}
  <span class="icon warning"><TriangleAlertIcon size={20} /></span>
{/snippet}
{#snippet infoIcon()}
  <span class="icon info"><InfoIcon size={20} /></span>
{/snippet}

<Toaster
  duration={3000}
  {errorIcon}
  {successIcon}
  {warningIcon}
  {infoIcon}
  position={NOTIFICATION_POSITIONS[position]}
  {...restProps}
/>

<style>
@layer max-ts-svelte-components {
  .icon {
    display: inline-flex;
  }
  .error {
    color: var(--colors-error);
  }
  .success {
    color: var(--colors-success);
  }
  .warning {
    color: var(--colors-warning);
  }
  .info {
    color: var(--colors-info);
  }
}
</style>
