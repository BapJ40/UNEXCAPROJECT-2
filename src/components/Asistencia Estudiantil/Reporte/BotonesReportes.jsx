import React from 'react';
import Box from '@mui/material/Box';
import DropdownSelector from '../../Componente generico/BotonGrado';
import SelectorMesAno from '../Registro Mensual/BotonMesAno';
import { Button } from '@mui/material';

export default function BotonesReportes({
  año, seccion, fechaActual,
  onAñoChange, onSeccionChange, onFechaChange,
  añoOptions, seccionOptions, vistaProfesor = false
}) {
  return (
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      
      {/* --- RENDERIZADO CONDICIONAL --- */}
      {/* Si NO es la vista de profesor, mostramos los filtros de Año y Sección */}
      {!vistaProfesor && (
        <>
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
        </>
      )}

      {/* El selector de mes y el botón de guardar siempre se muestran */}
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