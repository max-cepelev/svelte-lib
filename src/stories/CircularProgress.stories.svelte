<script module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { CircularProgress } from '../index.js';

const { Story } = defineMeta({
	title: 'CircularProgress',
	component: CircularProgress,
	tags: ['autodocs'],
});
</script>

<Story name="Example" args={{size: 30, color: 'primary'}} />


<Story name="Determinate" args={{variant: 'determinate', value:70 }}  />




