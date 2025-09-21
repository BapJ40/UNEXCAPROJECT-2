import React from 'react';
import { Typography } from '@mui/material'; // Ya no necesitamos Chip para esto
import GenericTable from '../../Componente generico/TablaBase';

export default function DetalleAsistenciaEstudiante({ datos, vistaProfesor }) {
  // 1. Modificamos la preparación de datos para la tabla.
  const datosTablaMaterias = vistaProfesor
    ? datos.map(profesor => {
        return {
          id: profesor.profesor,
          nombre: profesor.nombre,
          asistencias: profesor.asistencias // <-- Creamos la propiedad 'asistencias' para la tabla
        };
      })
    : datos.materias.map(materia => {
        // Buscamos la asistencia correspondiente a la materia, manejando mayúsculas/minúsculas.
        // APUNTAMOS A LA NUEVA PROPIEDAD 'asistencias'.
        const asistenciaKey = Object.keys(datos.asistencias).find(
          key => key.toLowerCase() === materia.toLowerCase()
        );
        // Si encontramos la asistencia, la usamos; si no, ponemos 0.
        const asistencia = asistenciaKey ? datos.asistencias[asistenciaKey] : 0;
        return {
          id: materia,
          materia: materia,
          asistencias: asistencia, // <-- Creamos la propiedad 'asistencias' para la tabla
        };
      });

  // 2. Definimos las nuevas columnas para mostrar las asistencias.
  const columnasTabla = [
    {
      field: vistaProfesor ? 'nombre' : 'materia',
      headerName: vistaProfesor ? 'Profesor' : 'Materia',
      align: 'left',
      sx: { fontWeight: 'bold' }
    },
    {
      field: 'asistencias', // <-- El campo ahora es 'asistencias'
      headerName: 'Total de Asistencias', // <-- El título de la columna cambia
      align: 'center',
      // Simplemente mostramos el número. Podemos hacerlo más vistoso si quieres,
      // pero mostrar el dato es lo principal.
      component: ({ value }) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      )
    }
  ];

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Historial de Asistencias de: <strong>{datos.nombre}</strong>
      </Typography>
      <GenericTable
        columns={columnasTabla}
        data={datosTablaMaterias}
        containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0' } }}
      />
    </>
  );
}