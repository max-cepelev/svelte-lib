

<script lang="ts">
import { Button } from '../Button/index.js';
import { Placeholder } from '../Placeholder/index.js';
import Spinner from '../Spinner/Spinner.svelte';
import styles from './styles.css.js';
import type { ContentStateProps } from './types.js';

let {
	isLoading,
	isError,
	isCustom,
	errorState,
	customState,
	children,
	loadingContent,
}: ContentStateProps = $props();
</script>

{#snippet actionSnippet()}
	<Button onclick={errorState?.onRetry}>Попробовать снова</Button>
{/snippet}

{#if isLoading}
	<div class={styles.loadingContainer}>
		{#if loadingContent}
			{loadingContent}
		{:else}
			<Spinner />
		{/if}
	</div>
{:else if isCustom && customState}
	<Placeholder {...customState} />
{:else if isError && errorState}
	<Placeholder
		title={errorState.title || 'Произошла ошибка'}
		description={errorState.errorList.join(', ')}
		imgAlt={errorState.imgAlt}
		imgSrc={errorState.imgSrc}
		actions={errorState.actions || actionSnippet}
	/>
{:else}
	{@render children?.()}
{/if}