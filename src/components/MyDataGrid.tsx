import React from 'react';
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridValueFormatterParams,
  GridValueGetterParams,
  GridSortModel,
  GridSortDirection,
  ruRU,
  GridRowParams,
} from '@mui/x-data-grid';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { CustomGridColumnMenu } from './CustomGridColumnMenu';
import { CustomPagination } from './CustomPagination';

/** The component is a table
 * @remarks
 * Used elements of MUI:
 * - {@link [DataGrid](https://mui.com/api/data-grid/data-grid)}
 * Also used сomponents:
 * - CustomGridColumnMenu
 * - CustomPagination
 * @returns JSX.Element
 */

export const MyDataGrid: React.FC = (): JSX.Element => {
  const useStyles = makeStyles({
    root: {
      '& .row.evenRow': {
        backgroundColor: '#eeeff6',
      },
    },
  });

  const classes = useStyles();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['1', '2'],
    },
    {
      field: 'userData',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => {
        return `${params.getValue(params.id, 'firstName') || 'noName'} - ${
          params.getValue(params.id, 'age') || 'noAge'
        }`;
      },
      sortComparator: (v1, v2, param1, param2) => {
        return (
          (param1.api.getCellValue(param1.id, 'age') as number) -
          (param2.api.getCellValue(param2.id, 'age') as number)
        );
      },
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 210,
      editable: true,
      align: 'center',
      renderHeader: (params: GridColumnHeaderParams) => {
        return <strong>{params.field}🎂</strong>;
      },
      valueFormatter: (params: GridValueFormatterParams) => {
        if (!params.value) return '-';
        const valueFormatted = 2021 - Number(params.value);
        return `${params.value} (${valueFormatted} г.)`;
      },
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const [pageSize, setPageSize] = React.useState<number>(5);

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'userData',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  return (
    <div
      style={{ height: 400, width: '90%', margin: 'auto' }}
      className={classes.root}
    >
      <DataGrid
        disableColumnSelector
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={(newVal) => setPageSize(newVal)}
        components={{
          Toolbar: CustomGridColumnMenu,
          Pagination: CustomPagination,
        }}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        getRowClassName={(params: GridRowParams<{ [key: string]: any }>) => {
          return clsx('row', {
            evenRow: +params.id % 2 === 0,
          });
        }}
      />
    </div>
  );
};
