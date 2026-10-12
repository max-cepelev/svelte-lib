import type { Tabs as TabsPrimitive } from 'bits-ui';
import type { WithoutChild } from '../../types';

export type TabsVariant = 'default' | 'line';

export type TabsProps = WithoutChild<TabsPrimitive.RootProps>;
export type TabsListProps = WithoutChild<TabsPrimitive.ListProps> & {
	variant?: TabsVariant;
};
export type TabsTriggerProps = WithoutChild<TabsPrimitive.TriggerProps>;
export type TabsContentProps = WithoutChild<TabsPrimitive.ContentProps>;
