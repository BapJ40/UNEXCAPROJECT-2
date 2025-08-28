import React from 'react';
import Box from '@mui/material/Box';
import DropdownSelector from '../../Componente generico/BotonGrado';
import SelectorMesAno from './BotonMesAno';
// ¡Ya no importamos nada de ConfigOptions!

export default function BotonesRegistroMensual({
  año, seccion, materia, fecha,
  onAñoChange, onSeccionChange, onMateriaChange, onFechaChange,
  añoOptions, seccionOptions, materiaOptions
}) {
  // ¡Quitamos todos los useState de aquí!

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <DropdownSelector
        label="Año"
        options={añoOptions} // Usamos las opciones del padre
        value={año}
        onChange={(e) => onAñoChange(e.target.value)}
      />

      <DropdownSelector
        label="Sección"
        options={seccionOptions} // Usamos las opciones del padre
        value={seccion}
        onChange={(e) => onSeccionChange(e.target.value)}
      />

      <DropdownSelector
        label="Materia"
        options={materiaOptions} // Usamos las opciones dinámicas del padre
        value={materia}
        onChange={(e) => onMateriaChange(e.target.value)}
        disabled={materiaOptions.length === 0}
      />

      <SelectorMesAno 
        fechaActual={fecha} 
        onFechaChange={onFechaChange} 
      />
    </Box>
  );
}