<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { OverflowTypography } from '../components';

const { Story } = defineMeta({
  title: 'OverflowTypography',
  component: OverflowTypography,
  tags: ['autodocs'],
});

const longText =
  'Очень длинный текст, который не помещается в контейнер и должен обрезаться с помощью многоточия';
const fileName =
  'very-long-file-name-with-important-ending-and-version-2026-final.pdf';
</script>

<Story
  name="Default"
  args={{
		text: longText,
		variant: 'body2',
	}}
  asChild
>
  <div style:width="260px">
    <OverflowTypography text={longText} variant="body2" />
  </div>
</Story>

<Story name="Without overflow" asChild>
  <div style:width="260px">
    <OverflowTypography text="Короткий текст" variant="body2" />
  </div>
</Story>

<Story name="Multiple rows" asChild>
  <div style:width="280px">
    <OverflowTypography text={longText} rowsCount={2} variant="body2" />
  </div>
</Story>

<Story name="Visible last symbols" asChild>
  <div style:width="320px">
    <OverflowTypography
      text={fileName}
      visibleLastSymbolsCount={14}
      variant="body2"
    />
  </div>
</Story>

<Story name="Custom tooltip" asChild>
  <div style:width="260px">
    <OverflowTypography
      text={longText}
      variant="body2"
      tooltipProps={{
				content: 'Кастомный текст tooltip',
				placement: 'bottom',
				arrow: true,
			}}
    />
  </div>
</Story>
