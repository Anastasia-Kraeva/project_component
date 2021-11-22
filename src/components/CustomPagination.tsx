import React from 'react';
import { Pagination } from '@mui/material';
import { useGridApiContext, useGridState } from '@mui/x-data-grid';

export const CustomPagination = () => {
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
