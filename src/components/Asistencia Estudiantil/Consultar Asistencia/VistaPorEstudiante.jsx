import React, { useState } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import DetalleAsistenciaEstudiante from './DetalleAsistenciaEstudiante'; // <-- Crearemos este nuevo componente

export default function VistaPorEstudiante({ todosLosEstudiantes }) {
  // 1. Estado para guardar el OBJETO COMPLETO del estudiante seleccionado
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  return (
    <Box>
      {/* 2. Reemplazamos Barradebusqueda con Autocomplete */}
      <Autocomplete
        options={todosLosEstudiantes} // La lista de opciones es todos los estudiantes
        // Cómo se muestra cada opción en la lista desplegable. ¡Resuelve el problema de nombres duplicados!
        getOptionLabel={(option) => `${option.nombre} - C.I: ${option.cedula}`}
        // Se ejecuta cuando el usuario selecciona una opción de la lista
        onChange={(event, newValue) => {
          setEstudianteSeleccionado(newValue); // Guardamos el objeto completo del estudiante
        }}
        value={estudianteSeleccionado}
        isOptionEqualToValue={(option, value) => option.cedula === value.cedula}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Estudiante"
            placeholder="Escribe un nombre o cédula..."
            sx={{ width: '400px' }}
          />
        )}
      />

      {/* 3. Renderizado condicional: La tabla de detalles solo aparece si se ha seleccionado un estudiante */}
      {estudianteSeleccionado && (
        <Box sx={{ mt: 4 }}>
          <DetalleAsistenciaEstudiante estudiante={estudianteSeleccionado} />
        </Box>
      )}
    </Box>
  );
}