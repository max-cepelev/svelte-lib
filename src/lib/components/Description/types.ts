import type { Snippet } from 'svelte';
import type { TypographyColor, TypographyVariant } from '../Typography';

export type DescriptionDirection = 'default' | 'column' | 'row';

export type DescriptionJustifyContent = 'space-between' | 'start';

export type DescriptionProps = {
	/**
	 * Элементы DescriptionName и DescriptionValue
	 */
	children?: Snippet<[]>;

	/**
	 * Позиционирует элементы либо по разным краям, либо по левому краю
	 */
	justifyContent?: DescriptionJustifyContent;

	/**
	 * Добавляет dashed разделитель, заполняющего свободное пространство между Name и Value
	 */
	leader?: boolean;

	/**
	 * Определяет разделитель между Name и Value
	 * @default ':'
	 */
	separator?: string;

	/**
	 * Определяет тип корневого HTML-элемента
	 */
	component?: 'div' | 'dl';

	/**
	 * Определяет перенос строк
	 * @default 'default'
	 */
	direction?: DescriptionDirection;

	class?: string;
};

export type DescriptionNameProps = {
	children?: Snippet<[]>;
	color?: TypographyColor;
	variant?: TypographyVariant;
	class?: string;
};

export type DescriptionValueProps = {
	children?: Snippet<[]>;
	color?: TypographyColor;
	variant?: TypographyVariant;

	/**
	 * Заглушка, отображающаяся, если нет значения
	 */
	stub?: Snippet<[]> | string;

	/**
	 * Символ-заглушка, если нет значения и stub
	 * @default '—'
	 */
	emptySymbol?: string;

	canCopy?: boolean;
	copyPosition?: 'left' | 'right';
	copyText?: string;
	isHidePersonalData?: boolean;
	class?: string;
};
