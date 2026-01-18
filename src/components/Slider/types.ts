import type { Slider as SliderPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../types.js';

export type SliderSize = 'small' | 'medium' | 'large';

export type SliderProps = WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
	size?: SliderSize;
};
