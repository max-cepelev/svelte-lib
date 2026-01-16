import { type SpacingKey, theme } from './theme.css.js';

export const negativeSpacing = (...keys: SpacingKey[]) =>
	keys.map((key) => `calc(-1 * ${theme.spacing[key]})`).join(' ');

export const spacing = (...keys: SpacingKey[]) => {
	return keys.map((key) => theme.spacing[key]).join(' ');
};

export const calculateSize = (value?: string | number) =>
	typeof value === 'number' ? `${value}px` : value;
