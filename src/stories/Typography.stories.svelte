<script module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Typography } from '../index.js';

const { Story } = defineMeta({
	title: 'Typography',
	component: Typography,
	tags: ['autodocs'],
});
</script>


<Story name="H1" args={{
  variant: 'h1',
	color: 'primary',
	align: 'center',
	weight: 'bold',
	transform: 'capitalize',
}}>
  Главный заголовок
</Story>

<Story name="H2" args={{
  variant: 'h2',
}}>
  Второстепенный заголовок
</Story>

<Story name="Overline" args={{
  variant: 'overline',
	weight: 'bold',
}}>
  Подпись
</Story>

<Story name="Caption" args={{
		variant: 'caption',
		color: 'error',
		display: 'inline',
		decoration: 'underline'
}}>
  Подпись с ошибкой
</Story>



