import type { ToasterProps } from 'svelte-sonner';
import type { NotificationPosition } from '../constants';

export type NotificationContainerProps = Omit<ToasterProps, 'position'> & {
	position?: NotificationPosition;
};
