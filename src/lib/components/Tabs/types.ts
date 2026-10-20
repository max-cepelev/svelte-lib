import type { Tabs as TabsPrimitive } from 'bits-ui';

export type TabsVariant = 'default' | 'line' | 'group';

export type TabsProps = TabsPrimitive.RootProps;
export type TabsListProps = TabsPrimitive.ListProps & {
	variant?: TabsVariant;
};
export type TabsTriggerProps = TabsPrimitive.TriggerProps;
export type TabsContentProps = TabsPrimitive.ContentProps;
