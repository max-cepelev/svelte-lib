import type { Popover as PopoverPrimitive } from 'bits-ui';
import type { WithoutChildrenOrChild } from '../../types.js';

export type PopoverProps = PopoverPrimitive.RootProps;

export type PopoverTriggerProps = PopoverPrimitive.TriggerProps;

export type PopoverCloseProps = PopoverPrimitive.CloseProps;

export type PopoverPortalProps = PopoverPrimitive.PortalProps;

export type PopoverContentProps = PopoverPrimitive.ContentProps & {
	portalProps?: WithoutChildrenOrChild<PopoverPortalProps>;
};
