import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import GenericTable from '../../Componente generico/TablaBase';

// Recibe los estudiantes a mostrar y la materia seleccionada
export default function TablaHistorial({ estudiantesAMostrar, materiaSeleccionada }) {
  
  if (!estudiantesAMostrar || estudiantesAMostrar.length === 0) {
    return <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>No hay estudiantes que mostrar. Realice una búsqueda o seleccione filtros.</Typography>;
  }

  // Columnas dinámicas (en este caso, por materia, no por día)
  const columnasTabla = [
    { field: 'nombre', headerName: 'Estudiante', align: 'left' },
    { field: 'año', headerName: 'Año', align: 'center' },
    { field: 'seccion', headerName: 'Sección', align: 'center' },
    { field: 'asistenciaTotal', headerName: 'Asistencias', align: 'center', component: ({value}) => <Chip label={value} color={value > 150 ? 'success' : 'warning'} /> },
    { field: 'notaMateria', headerName: materiaSeleccionada || 'Nota', align: 'center' }
  ];

  // Mapeamos los datos de los estudiantes al formato de la tabla
  const datosTabla = estudiantesAMostrar.map(est => {
    let nota = 'N/A';
    if (materiaSeleccionada && est.notas) {
        const notaKey = Object.keys(est.notas).find(k => k.toLowerCase() === materiaSeleccionada.toLowerCase());
        if (notaKey) nota = est.notas[notaKey];
    }

    return {
        id: est.cedula,
        nombre: est.nombre,
        año: est.año,
        seccion: est.seccion,
        asistenciaTotal: est.asistencias,
        notaMateria: nota
    };
  });
  
  return (
    <GenericTable
      columns={columnasTabla}
      data={datosTabla}
      containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0', mt: 2 } }}
    />
  );
}