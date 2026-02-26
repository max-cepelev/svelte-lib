import { type SpacingKey, theme } from './theme.css';

export type Spacing = {
	(value: SpacingKey): string;
	(topBottom: SpacingKey, rightLeft: SpacingKey): string;
	(top: SpacingKey, rightLeft: SpacingKey, bottom: SpacingKey): string;
	(
		top: SpacingKey,
		right: SpacingKey,
		bottom: SpacingKey,
		left: SpacingKey,
	): string;
};

export const negativeSpacing: Spacing = (...keys: SpacingKey[]) =>
	keys.map((key) => `calc(-1 * ${theme.spacing[key]})`).join(' ');

export const spacing: Spacing = (...keys: SpacingKey[]) => {
	return keys.map((key) => theme.spacing[key]).join(' ');
};

export const calculateSize = (value?: string | number) =>
	typeof value === 'number' ? `${value}px` : value;

export const createGetters = <T extends Record<string, unknown>>(
	obj: T,
): {
	[K in keyof T]: () => T[K];
} => {
	const getters = {} as {
		[K in keyof T]: () => T[K];
	};

	for (const key of Object.keys(obj) as (keyof T)[]) {
		Object.defineProperty(getters, key, {
			get() {
				return obj[key];
			},
			enumerable: true,
			configurable: true,
		});
	}

	return getters;
};
