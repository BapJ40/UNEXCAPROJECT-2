import React from 'react';
import Box from '@mui/material/Box';
import DropdownSelector from '../../Componente generico/BotonGrado';
import SelectorMesAno from '../Registro Mensual/BotonMesAno';
import { Button } from '@mui/material';

export default function BotonesReportes({
  año, seccion, fechaActual,
  onAñoChange, onSeccionChange, onFechaChange,
  añoOptions, seccionOptions
}) {
  // ¡Quitamos todos los useState!

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
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
      <SelectorMesAno 
        fechaActual={fechaActual} 
        onFechaChange={onFechaChange} 
      />
      <Button variant="contained" color="primary">
        Guardar Reporte
      </Button>      
    </Box>
  );
}