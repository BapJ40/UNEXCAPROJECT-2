import React from 'react';
import Box from '@mui/material/Box';
import BotonFecha from '../../Componente generico/Boton-Fecha';
import DropdownSelector from '../../Componente generico/BotonGrado';
import Barradebusqueda from '../../Componente generico/Barra-de-busqueda';
import SelectorMesAno from '../Registro Mensual/BotonMesAno';

// 1. Recibimos los valores y las funciones de cambio desde las props
export default function BotonesRegistros({
  año, seccion, materia, busqueda,
  onAñoChange, onSeccionChange, onMateriaChange, onBusquedaChange,
  añoOptions, seccionOptions, materiaOptions, vistaProfesor = false,
  registroDiario, registroMensual, fecha, onFechaChange
}) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      {registroDiario && (
        <>
          <Barradebusqueda 
            label={vistaProfesor ? "Buscar Docente" : "Buscar Estudiante"}
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => onBusquedaChange(e.target.value)}
            sx={{ width: '300px', marginLeft: '16px' }}
            {...(!vistaProfesor && { disabled: materia === '' })}
          />
          
          <BotonFecha />        
        </>
      )}

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
          <DropdownSelector
            label="Materia"
            options={materiaOptions}
            value={materia}
            onChange={(e) => onMateriaChange(e.target.value)}
            disabled={materiaOptions.length === 0}
          />
        </>
      )}

       {registroMensual && (
        <SelectorMesAno fechaActual={fecha} onFechaChange={onFechaChange} />
      )}

      
    </Box>
  );
}