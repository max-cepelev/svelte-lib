import type { Component } from 'svelte';
import type { MouseEventHandler } from 'svelte/elements';
import { toast } from 'svelte-sonner';

export type NotificationService = typeof toast;

export type NotificationOptions = {
	/** Secondary text under the title. */
	content?: string;
};

const toToastData = (options?: NotificationOptions) =>
	options?.content ? { description: options.content } : undefined;

export class Notification {
	readonly #service: NotificationService;

	constructor(service: NotificationService) {
		this.#service = service;
	}

	public message(title: string, message?: string) {
		return this.#service.message(title, {
			description: message,
		});
	}

	public success = (title: string, options?: NotificationOptions) =>
		this.#service.success(title, toToastData(options));

	public error = (title: string, options?: NotificationOptions) =>
		this.#service.error(title, toToastData(options));

	public info = (title: string, options?: NotificationOptions) =>
		this.#service.info(title, toToastData(options));

	public warning = (title: string, options?: NotificationOptions) =>
		this.#service.warning(title, toToastData(options));

	public loading = (title: string, options?: NotificationOptions) =>
		this.#service.loading(title, toToastData(options));

	public dismiss = (id?: string | number) => this.#service.dismiss(id);

	public custom = (component: Component) => this.#service.custom(component);

	public action = ({
		title,
		buttonLabel,
		onClick,
	}: {
		title: string;
		buttonLabel: string;
		onClick: MouseEventHandler<HTMLButtonElement>;
	}) =>
		this.#service(title, {
			action: {
				label: buttonLabel,
				onClick,
			},
		});
}

export const notification = new Notification(toast);
