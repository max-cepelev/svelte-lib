import type { Component } from 'svelte';
import { describe, expect, it, vi } from 'vitest';
import { Notification, type NotificationService } from './Notification';

function createService() {
	const service = Object.assign(
		vi.fn(() => 'toast'),
		{
			message: vi.fn(() => 'message'),
			success: vi.fn(() => 'success'),
			error: vi.fn(() => 'error'),
			info: vi.fn(() => 'info'),
			warning: vi.fn(() => 'warning'),
			loading: vi.fn(() => 'loading'),
			dismiss: vi.fn((id?: string | number) => id),
			custom: vi.fn(() => 'custom'),
		},
	);

	return {
		service,
		notification: new Notification(service as unknown as NotificationService),
	};
}

describe('Notification', () => {
	it('shows a message with a description', () => {
		const { notification, service } = createService();

		expect(notification.message('Сохранено', 'Изменения применены')).toBe(
			'message',
		);
		expect(service.message).toHaveBeenCalledWith('Сохранено', {
			description: 'Изменения применены',
		});
	});

	it.each(['success', 'error', 'info', 'warning', 'loading'] as const)(
		'shows a %s toast',
		(type) => {
			const { notification, service } = createService();

			expect(notification[type]('Заголовок')).toBe(type);
			expect(service[type]).toHaveBeenCalledWith('Заголовок', undefined);
		},
	);

	it('passes content as the toast description', () => {
		const { notification, service } = createService();

		notification.warning('Не все файлы добавлены', {
			content: 'Можно загрузить не более 2',
		});

		expect(service.warning).toHaveBeenCalledWith('Не все файлы добавлены', {
			description: 'Можно загрузить не более 2',
		});
	});

	it('keeps methods bound when destructured', () => {
		const { notification, service } = createService();
		const { error } = notification;

		error('Ошибка');

		expect(service.error).toHaveBeenCalledWith('Ошибка', undefined);
	});

	it('dismisses a toast', () => {
		const { notification, service } = createService();

		expect(notification.dismiss('toast-1')).toBe('toast-1');
		expect(service.dismiss).toHaveBeenCalledWith('toast-1');
	});

	it('renders a custom component', () => {
		const { notification, service } = createService();
		const component = (() => {}) as unknown as Component;

		notification.custom(component);

		expect(service.custom).toHaveBeenCalledWith(component);
	});

	it('shows a toast with an action button', () => {
		const { notification, service } = createService();
		const onClick = vi.fn();

		notification.action({
			title: 'Файл удалён',
			buttonLabel: 'Отменить',
			onClick,
		});

		expect(service).toHaveBeenCalledWith('Файл удалён', {
			action: { label: 'Отменить', onClick },
		});
	});
});
