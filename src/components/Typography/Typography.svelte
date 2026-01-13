<script lang="ts">
import type { Snippet } from 'svelte';
import {
	alignments,
	colors,
	decorations,
	displays,
	gutterBottomClass,
	transforms,
	variants,
	weights,
} from './styles.css.js';
import type {
	ComponentVariant,
	TypographyAlign,
	TypographyColor,
	TypographyVariant,
} from './types.js';

let {
	ref = $bindable(null),
	align = 'left',
	class: className,
	children,
	color = 'primary',
	component: Component,
	decoration = 'none',
	display = 'inline',
	gutterBottom,
	transform,
	variant = 'body1',
	weight = 'normal',
	...restProps
}: {
	align?: TypographyAlign;
	variant?: TypographyVariant;
	color?: TypographyColor;
	component?: ComponentVariant;
	display?: 'block' | 'inline';
	weight?: 'normal' | 'bold' | 'medium' | 'semibold';
	transform?: 'lowercase' | 'capitalize' | 'uppercase';
	decoration?: 'none' | 'underline' | 'lineThrough';
	gutterBottom?: boolean;
	children?: Snippet;
	ref?: HTMLElement | null;
	class?: string;
	[key: string]: any;
} = $props();

const VARIANT_COMPONENT_MAP: Record<
	NonNullable<TypographyVariant>,
	ComponentVariant
> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

const TagComponent = $derived(
	Component || VARIANT_COMPONENT_MAP[variant || 'body1'],
);

const mergedProps = $derived({
	...restProps,
	ref,
	class: [
		decorations[decoration],
		variants[variant],
		colors[color],
		weights[weight],
		transform && transforms[transform],
		displays[display],
		alignments[align],
		{
			[gutterBottomClass]: gutterBottom,
		},
		className,
	],
});
</script>

<svelte:element this={TagComponent} {...mergedProps}>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>
