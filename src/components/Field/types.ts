import type { ComplexStyleRule } from '~/styles/index.js';

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

export type FieldVariants = Record<FieldOrientation, ComplexStyleRule>;
