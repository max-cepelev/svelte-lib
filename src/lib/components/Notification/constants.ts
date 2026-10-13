export const NotificationVariantTypes = {
	info: 'info',
	success: 'success',
	warning: 'warning',
	error: 'error',
} as const;

export type NotificationVariantType =
	(typeof NotificationVariantTypes)[keyof typeof NotificationVariantTypes];

export const NOTIFICATION_POSITIONS = {
	topRight: 'top-right',
	topLeft: 'top-left',
	bottomRight: 'bottom-right',
	bottomLeft: 'bottom-left',
	topCenter: 'top-center',
	bottomCenter: 'bottom-center',
} as const;

export type NotificationPosition = keyof typeof NOTIFICATION_POSITIONS;

export const NOTIFY_CLASSNAME = 'notify';
