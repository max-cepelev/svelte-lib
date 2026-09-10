export type PlaceholderSize = 'small' | 'medium' | 'large';

import type { Snippet } from 'svelte';

export type PlaceholderProps = {
	/** Название класса, применяется к корневому компоненту */
	class?: string;

	/** Ссылка на изображение */
	imgSrc?: string;

	/** Описание изображения (атрибут alt) */
	imgAlt?: string;

	/** Заголовок */
	title: string;

	/** Описание */
	description?: string;

	/** Действия */
	actions?: Snippet<[]>;

	/** Задает общий размер компонента */
	size?: PlaceholderSize;
};
