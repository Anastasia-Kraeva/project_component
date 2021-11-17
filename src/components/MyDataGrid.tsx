import React from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnHeaderParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@material-ui/core';

export const MyDataGrid = () => {
  const theme = useTheme();

  const useStyles = makeStyles({
    root: {
      '& .cell.evenCell': {
        backgroundColor: theme.palette.background.default,
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
        return `год рождения ${valueFormatted} (${params.value} лет)`;
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

  

  return (
    <div
      style={{ height: 400, width: '90%', margin: 'auto' }}
      className={classes.root}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        onPageSizeChange={(newVal) => setPageSize(newVal)}
      />
    </div>
  );
};
