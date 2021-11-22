import React from 'react';
import { Pagination } from '@mui/material';
import { useGridApiContext, useGridState } from '@mui/x-data-grid';

/**The component is an element containing buttons for switching pages. 
 * Two arrow buttons and between them buttons with page numbers. 
 * @remarks
 * Used MUI components:
 * - {@link [Pagination]:(https://mui.com/api/pagination)}
 * @returns JSX.Element
 */

export const CustomPagination: React.FC = (): JSX.Element => {
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
