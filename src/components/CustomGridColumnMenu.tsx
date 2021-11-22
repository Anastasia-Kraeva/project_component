import React from 'react';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { IconButton, Typography } from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import PrintIcon from '@mui/icons-material/Print';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import GradeIcon from '@mui/icons-material/Grade';
import { Box } from '@mui/system';

export const CustomGridColumnMenu = () => {
  const apiRef = useGridApiContext();
  const [isShowGradeIcon, setIsShowGradeIcon] = React.useState<boolean>(false);

  const customExport = () => {};

  return (
    <GridToolbarContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '8px 32px',
        }}
      >
        <Typography sx={{ color: '#888' }}>
          Параметры инструмента по ISO
        </Typography>
        <Box>
          <IconButton
            aria-label="отфильтровать"
            onClick={() => apiRef.current.showFilterPanel()}
          >
            <FilterListIcon />
          </IconButton>
          <IconButton
            aria-label="распечатать"
            onClick={() => apiRef.current.exportDataAsPrint()}
          >
            <PrintIcon />
          </IconButton>
          <IconButton
            aria-label="экспортировать в excel"
            onClick={() => customExport.apply(apiRef.current)}
          >
            <SaveAltIcon />
          </IconButton>
          <IconButton
            aria-label="мои выборки"
            onClick={() => console.log('мои выборки')}
          >
            <FolderSpecialIcon />
          </IconButton>
          {isShowGradeIcon && (
            <IconButton
              aria-label="сохранить в выборки"
              onClick={() => console.log('сохранить в выборки')}
            >
              <GradeIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </GridToolbarContainer>
  );
};
