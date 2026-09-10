import type { Dialog as DialogPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef, WithoutChildrenOrChild } from '../../types';

export type DrawerProps = DialogPrimitive.RootProps & {
	notCloseable?: boolean;
	shouldScaleBackground?: boolean;
};

export type DrawerTriggerProps = DialogPrimitive.TriggerProps;

export type DrawerCloseProps = DialogPrimitive.CloseProps;

export type DrawerPortalProps = DialogPrimitive.PortalProps;

export type DrawerOverlayProps = DialogPrimitive.OverlayProps;

export type DrawerTitleProps = DialogPrimitive.TitleProps;

export type DrawerDescriptionProps = DialogPrimitive.DescriptionProps;

export type DrawerContentProps =
	WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		showCloseButton?: boolean;
		swipeCloseThreshold?: number;
		portalProps?: WithoutChildrenOrChild<DrawerPortalProps>;
		children?: Snippet;
	};

export type DrawerHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

export type DrawerFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
