import React from 'react'
import { Box, Button, Autocomplete, TextField } from '@mui/material';
import Barradebusqueda from '../Componente generico/Barra-de-busqueda';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DropdownSelector from '../Componente generico/BotonGrado';

export default function FiltrosGestionEstudiantes( {año, onAñoChange, añoOptions, seccion, seccionOptions, onSeccionChange, todosLosEstudiantes, estudianteBuscado, onEstudianteBuscadoChange } ) {
  return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
           <Box sx={{ flex: 1, mr: 2 }}>
        {/* --- 2. REEMPLAZAMOS Barradebusqueda CON Autocomplete --- */}
        <Autocomplete
          options={todosLosEstudiantes}
          // Así se muestra cada opción en la lista (Nombre - Cédula)
          getOptionLabel={(option) => `${option.nombre} - C.I: ${option.cedula}`}
          // El valor actual del componente
          value={estudianteBuscado}
          // Función que se llama cuando el usuario selecciona una opción
          onChange={(event, newValue) => {
            onEstudianteBuscadoChange(newValue); // 'newValue' es el objeto completo del estudiante
          }}
          // Importante para comparar objetos
          isOptionEqualToValue={(option, value) => option.cedula === value.cedula}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar Estudiante"
              placeholder="Escribe un nombre o cédula..."
            />
          )}
        />
      </Box>

          {/* Filtros para los estudiantes */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <DropdownSelector 
            label="Año"
            options={añoOptions}
            value={año}
            onChange={(e) => onAñoChange(e.target.value)}
            />

            <DropdownSelector
            label="Seccion"
            options={seccionOptions}
            value={seccion}
            onChange={(e) => onSeccionChange(e.target.value)}
            />

            <Button variant='outlined' size="medium" startIcon={<FileDownloadIcon />} sx={{ fontSize: '20px', py: 1 }}>
            Exportar
            </Button>
          </Box>
        </Box>
  )
}
