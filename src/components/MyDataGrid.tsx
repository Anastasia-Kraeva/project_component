import React from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
  GridValueFormatterParams,
  GridToolbar,
  GridValueGetterParams,
  GridSortModel,
  GridSortDirection,
  useGridApiContext,
  useGridState,
} from '@mui/x-data-grid';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Pagination } from '@mui/material';

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const [state] = useGridState(apiRef);

  return (
    <Pagination
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(e, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

export const MyDataGrid = () => {
  const useStyles = makeStyles({
    root: {
      '& .cell.evenCell': {
        backgroundColor: '#fff', //***почему makeStyles не получает тему, даже если ожидать входные данные
      },
      '& .cell.oddCell': {
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
      cellClassName: (params: GridCellParams) => {
        return clsx('cell', {
          evenCell: +params.id % 2 === 0,
          oddCell: +params.id % 2 !== 0,
        });
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
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </div>
  );
};
