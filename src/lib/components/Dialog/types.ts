import type { Dialog as DialogPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { WithElementRef, WithoutChildrenOrChild } from '../../types';

export type DialogProps = DialogPrimitive.RootProps;

export type DialogTriggerProps = DialogPrimitive.TriggerProps;

export type DialogCloseProps = DialogPrimitive.CloseProps;

export type DialogPortalProps = DialogPrimitive.PortalProps;

export type DialogOverlayProps = DialogPrimitive.OverlayProps;

export type DialogTitleProps = DialogPrimitive.TitleProps;

export type DialogDescriptionProps = DialogPrimitive.DescriptionProps;

export type DialogContentProps =
	WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		showCloseButton?: boolean;
		portalProps?: WithoutChildrenOrChild<DialogPortalProps>;
		children?: Snippet;
	};

export type DialogHeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;

export type DialogFooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
