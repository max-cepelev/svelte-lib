import type { ComplexStyleRule } from '@vanilla-extract/css';

export type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';

export type FieldVariants = Record<FieldOrientation, ComplexStyleRule>;
