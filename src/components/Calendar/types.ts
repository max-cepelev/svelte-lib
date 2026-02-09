import type { DateValue } from '@internationalized/date';
import type { Calendar } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { WithoutChildrenOrChild } from '../../types.ts';
import type { ButtonVariant } from '../Button/types';

export type CalendarProps = WithoutChildrenOrChild<Calendar.RootProps> & {
	buttonVariant?: ButtonVariant;
	captionLayout?: 'dropdown' | 'dropdown-months' | 'dropdown-years' | 'label';
	months?: Calendar.MonthSelectProps['months'];
	years?: Calendar.YearSelectProps['years'];
	monthFormat?: Calendar.MonthSelectProps['monthFormat'];
	yearFormat?: Calendar.YearSelectProps['yearFormat'];
	day?: Snippet<[{ day: DateValue; outsideMonth: boolean }]>;
};
