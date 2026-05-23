import type { Snippet } from 'svelte';
import type { TooltipProps } from '../Tooltip';
import type { TypographyProps } from '../Typography';

export type OverflowTypographyTooltipProps = Omit<
	TooltipProps,
	'children' | 'content'
> & {
	content?: TooltipProps['content'];
};

export type OverflowTypographyProps = Omit<
	TypographyProps,
	'children' | 'ref'
> & {
	/** Максимальное количество отображаемых строк. */
	rowsCount?: number;
	/** Количество видимых символов в конце обрезанной строки. */
	visibleLastSymbolsCount?: number;
	/** Текст для обрезки и дефолтного содержимого tooltip. */
	text?: string;
	/** Пропсы для кастомизации tooltip. */
	tooltipProps?: OverflowTypographyTooltipProps;
	children?: Snippet<[]> | string;
	ref?: HTMLElement | null;
};
