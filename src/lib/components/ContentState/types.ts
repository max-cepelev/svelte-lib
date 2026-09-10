import type { Snippet } from 'svelte';
import type { PlaceholderProps } from '../Placeholder';

export type ContentStateProps = {
	/**
	 * Флаг состояния загрузки
	 */
	isLoading?: boolean;
	/**
	 * Элемент для отображения состояния загрузки
	 */
	loadingContent?: Snippet<[]>;
	/**
	 * Флаг состояния ошибки
	 */
	isError?: boolean;
	/**
	 * Параметры для отображения состояния ошибки
	 */
	errorState?: ContentStateErrorProps;
	/**
	 * Флаг для отображения custom состояния ошибки
	 */
	isCustom?: boolean;
	/**
	 * Параметры для отображения custom состояния ошибки
	 */
	customState?: PlaceholderProps;
	/**
	 * Элементы для отображения состояния "Успех"
	 */
	children: Snippet<[]>;
};

export type ContentStateErrorProps = {
	/**
	 * Название ошибки
	 */
	title?: string;

	imgSrc?: string;
	/**
	 * Alt атрибут для изображения
	 */
	imgAlt?: string;
	/**
	 * Список ошибок для отображения
	 */
	errorList: string[];
	/**
	 * Элементы кнопок для дальнейших действий
	 */
	actions?: Snippet<[]>;
	/**
	 * Функция для повторного действия
	 */
	onRetry: () => void;
};
