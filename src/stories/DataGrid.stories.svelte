<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import {
  DataGrid,
  type DataGridColumn,
  type DataGridColumns,
  DataGridSortHeader,
  type DataGridSorting,
} from '../components/index.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
  title: 'DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
});

const rows = [
  {
    id: 1,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 2,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 3,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 4,
    name: 'Dave',
    date: '2023-06-15',
  },
  {
    id: 5,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 6,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 7,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 8,
    name: 'Dave',
    date: '2023-06-15',
  },
  {
    id: 9,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 10,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 11,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 12,
    name: 'Dave',
    date: '2023-06-15',
  },
  {
    id: 13,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 14,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 15,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 16,
    name: 'Dave',
    date: '2023-06-15',
  },
  {
    id: 17,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 18,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 20,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 21,
    name: 'Dave',
    date: '2023-06-15',
  },
  {
    id: 22,
    name: 'Alice',
    date: '2023-06-12',
  },
  {
    id: 23,
    name: 'Bob',
    date: '2023-06-13',
  },
  {
    id: 24,
    name: 'Charlie',
    date: '2023-06-14',
  },
  {
    id: 25,
    name: 'Dave',
    date: '2023-06-15',
  },
];

const columns: DataGridColumns<{
  id: number;
  name: string;
  date: string;
}> = [
  {
    title: 'ID',
    field: 'id',
  },
  {
    title: 'Имя',
    field: 'name',
  },
  {
    title: 'Дата',
    field: 'date',
    align: 'center',
  },
];

let sorting = $state<DataGridSorting<(typeof rows)[0]>>({
  key: 'id',
  order: 'asc',
});
const sortedRows = $derived(
  [...rows].sort((a, b) => {
    if (sorting.order === 'asc') {
      return a[sorting.key] > b[sorting.key] ? 1 : -1;
    }
    return a[sorting.key] < b[sorting.key] ? 1 : -1;
  }),
);

const columnsWithSorting: DataGridColumns<(typeof rows)[0]> = [
  {
    title: 'ID',
    field: 'id',
    align: 'center',
    headerCell,
  },
  {
    title: 'Имя',
    field: 'name',
    headerCell,
  },
  {
    title: 'Дата',
    field: 'date',
    align: 'center',
    headerCell,
  },
];

const setSorting = (newSorting: DataGridSorting<(typeof rows)[0]>) => {
  sorting = newSorting;
};
</script>

{#snippet headerCell(column: DataGridColumn<(typeof rows)[0]>)}
  <DataGridSortHeader {column} {sorting} {setSorting} />
{/snippet}

<Story name="Example" asChild>
  <div style:display="flex" style:align-items="center" style:height="400px">
    <DataGrid {rows} {columns} keyId="id" />
  </div>
</Story>

<Story name="WithSorting" asChild>
  <div style:display="flex" style:align-items="center" style:height="400px">
    <DataGrid
      stickyHeader
      rows={sortedRows}
      columns={columnsWithSorting}
      keyId="id"
    />
  </div>
</Story>
