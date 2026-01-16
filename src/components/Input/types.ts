import type {
	HTMLInputAttributes,
	HTMLInputTypeAttribute,
} from 'svelte/elements';
import type { WithElementRef } from '../../types.js';

export type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

export type InputProps = WithElementRef<
	Omit<HTMLInputAttributes, 'type' | 'size'> &
		(
			| { type: 'file'; files?: FileList }
			| { type?: InputType; files?: undefined }
		)
> & {
	size?: 'small' | 'medium' | 'large';
};
