<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import { Description } from '../components';

const { Story } = defineMeta({
  title: 'Description',
  component: Description.Root,
  tags: ['autodocs'],
});
</script>

<Story name="Default" asChild>
  <Description.Root>
    <Description.Name>Площадь</Description.Name>
    <Description.Value canCopy>42 м²</Description.Value>
  </Description.Root>
  <Description.Root>
    <Description.Name>Этаж</Description.Name>
    <Description.Value>5 из 12</Description.Value>
  </Description.Root>
  <Description.Root>
    <Description.Name>Отделка</Description.Name>
    <Description.Value>Черновая</Description.Value>
  </Description.Root>
</Story>

<Story name="With Leader" asChild>
  <Description.Root leader>
    <Description.Name>Площадь</Description.Name>
    <Description.Value>42 м²</Description.Value>
  </Description.Root>

  <Description.Root leader>
    <Description.Name>Этаж</Description.Name>
    <Description.Value>5 из 12</Description.Value>
  </Description.Root>
  <Description.Root leader>
    <Description.Name>Отделка</Description.Name>
    <Description.Value>Черновая</Description.Value>
  </Description.Root>
</Story>

<Story name="Column Direction" asChild>
  <Description.Root direction="column">
    <Description.Name>Площадь</Description.Name>
    <Description.Value>42 м²</Description.Value>
  </Description.Root>
  <Description.Root direction="column">
    <Description.Name>Этаж</Description.Name>
    <Description.Value>5 из 12</Description.Value>
  </Description.Root>
  <Description.Root direction="column">
    <Description.Name>Отделка</Description.Name>
    <Description.Value>Черновая</Description.Value>
  </Description.Root>
</Story>

<Story name="With Copy" asChild>
  <Description.Root leader>
    <Description.Name>ID объекта</Description.Name>
    <Description.Value canCopy copyText="123456789"
      >123456789</Description.Value
    >
  </Description.Root>

  <Description.Root leader>
    <Description.Name>Артикул</Description.Name>
    <Description.Value canCopy copyPosition="left">ART-9876</Description.Value>
  </Description.Root>
</Story>

<Story name="With Stub" asChild>
  <Description.Root leader>
    <Description.Name>Площадь</Description.Name>
    <Description.Value>42 м²</Description.Value>
  </Description.Root>
  <Description.Root leader>
    <Description.Name>Балкон</Description.Name>
    <Description.Value stub="Нет балкона" />
  </Description.Root>
  <Description.Root leader>
    <Description.Name>Терраса</Description.Name>
    <Description.Value />
  </Description.Root>
</Story>
