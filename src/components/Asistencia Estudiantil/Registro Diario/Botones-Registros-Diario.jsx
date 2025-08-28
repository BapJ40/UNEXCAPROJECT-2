import React from 'react';
import Box from '@mui/material/Box';
import BotonFecha from '../../Componente generico/Boton-Fecha';
import DropdownSelector from '../../Componente generico/BotonGrado';
import Barradebusqueda from '../../Componente generico/Barra-de-busqueda';

// 1. Recibimos los valores y las funciones de cambio desde las props
export default function BotonesRegistrosDiario({
  año, seccion, materia, busqueda,
  onAñoChange, onSeccionChange, onMateriaChange, onBusquedaChange,
  añoOptions, seccionOptions, materiaOptions
}) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <BotonFecha />
      {/* 3. Conectamos las props a los componentes */}
      <DropdownSelector
        label="Año"
        options={añoOptions}
        value={año}
        onChange={(e) => onAñoChange(e.target.value)}
      />
      <DropdownSelector
        label="Sección"
        options={seccionOptions}
        value={seccion}
        onChange={(e) => onSeccionChange(e.target.value)}
      />
      <DropdownSelector
        label="Materia"
        options={materiaOptions}
        value={materia}
        onChange={(e) => onMateriaChange(e.target.value)}
        disabled={materiaOptions.length === 0}
      />
      <Barradebusqueda 
        label="Buscar Estudiante"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        sx={{ width: '300px', marginLeft: '16px' }}
      />
    </Box>
  );
}