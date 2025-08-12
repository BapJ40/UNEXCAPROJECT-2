import React from 'react';
import { Box, Typography } from '@mui/material';
import GenericTable from './TablaBase';
import Paper from '@mui/material/Paper';

export default function Tablamaterias({ estudiante }) {
  const calcularPromedio = (nota) => {
    return nota; // Lógica real de cálculo
  };

  const columns = [
    {
      field: 'materia',
      headerName: 'Materia',
      align: 'left',
      sx: { fontWeight: 'bold' }
    },
    {
      field: 'lapso1',
      headerName: '1er Lapso',
      align: 'center',
      render: (value) => (
        <span style={{ color: value >= 10 ? 'green' : 'red' }}>
          {value}
        </span>
      )
    },
    {
      field: 'lapso2',
      headerName: '2do Lapso',
      align: 'center',
      render: (value) => (
        <span style={{ color: value >= 10 ? 'green' : 'red' }}>
          {value}
        </span>
      )
    },
    {
      field: 'lapso3',
      headerName: '3er Lapso',
      align: 'center',
      render: (value) => (
        <span style={{ color: value >= 10 ? 'green' : 'red' }}>
          {value}
        </span>
      )
    },
    {
      field: 'promedio',
      headerName: 'Promedio',
      align: 'center',
      render: (value) => (
        <span style={{ color: value >= 10 ? 'green' : 'red' }}>
          {calcularPromedio(value)}
        </span>
      )
    },
    {
      field: 'estado',
      headerName: 'Estado',
      align: 'center',
      render: (value) => (
        <span style={{ color: value >= 10 ? 'green' : 'red' }}>
          {value >= 10 ? 'Aprobado' : 'Reprobado'}
        </span>
      )
    }
  ];

  // Transformar los datos para que coincidan con la estructura de columnas
  const tableData = estudiante.materias.map(materia => {
    const nota = estudiante.notas[materia.toLowerCase()] || 0;
    return {
      materia,
      lapso1: nota,
      lapso2: nota,
      lapso3: nota,
      promedio: nota,
      estado: nota
    };
  });

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 2, mt: 2 }}>
      <Typography variant="h6" fontWeight={'bold'} sx={{ mt: 2, mb: 1 }}>
        Calificaciones
      </Typography>
      
      <GenericTable
        data={tableData}
        columns={columns}
        containerProps={{
          component: Paper,
          sx: { boxShadow: 'none' }
        }}
        sx={{
          '& .MuiTableCell-root': {
            py: 1.5,
            fontSize: '0.875rem'
          },
        }}
        cellSx={{ py: 1.5, fontSize: '0.875rem' }}
      />
    </Box>
  );
}