import type { PinInput as InputOTPPrimitive } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef } from '../../types';

export type InputOTPProps = InputOTPPrimitive.RootProps;

export type InputOTPSlotProps = InputOTPPrimitive.CellProps;

export type InputOTPGroupProps = WithElementRef<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type InputOTPSeparatorProps = WithElementRef<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
