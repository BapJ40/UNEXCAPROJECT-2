import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  IconButton,
  Box
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const GenericTable = ({
  data = [],
  columns = [],
  actions = [], // <- Mantenemos las acciones
  sx = {},
  containerProps = {},
  cellSx = {},
  onCellChange = () => {},
  onActionClick = () => {} // <- Mantenemos el manejo de acciones
}) => {
  return (
    <TableContainer component={Paper} {...containerProps}>
      <Table sx={{ minWidth: 650, ...sx }} aria-label="generic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell 
                key={column.field} 
                align={column.align || 'left'}
                sx={{ fontWeight: 'bold', ...cellSx }}
              >
                {column.headerName}
              </TableCell>
            ))}
            {actions.length > 0 && ( // <- Mostrar columna de acciones si existen
              <TableCell align="center" sx={{ fontWeight: 'bold', ...cellSx }}>
                Acciones
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell 
                  key={`${rowIndex}-${column.field}`} 
                  align={column.align || 'left'}
                  sx={cellSx}
                >
                  {column.component ? (
                    column.component({ 
                      value: row[column.field], 
                      onChange: (newValue) => onCellChange(rowIndex, column.field, newValue),
                      rowData: row
                    })
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
              
              {actions.length > 0 && ( // <- Renderizar botones de acciones
                <TableCell align="center" sx={cellSx}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {actions.map((action) => (
                      <IconButton
                        key={action.name}
                        color={action.color || 'primary'}
                        onClick={() => onActionClick(action.name, row)}
                      >
                        {action.icon}
                      </IconButton>
                    ))}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;