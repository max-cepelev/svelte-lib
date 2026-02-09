import type { Slider as SliderPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../types.ts';

export type SliderSize = 'small' | 'medium' | 'large';

export type SliderProps = WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
	size?: SliderSize;
};
