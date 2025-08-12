import React from 'react'
import Box from '@mui/material/Box';
import DropdownSelector from '../Componente generico/BotonGrado';
import { gradoOptions } from '../Componente generico/ConfigOptions';
import { seccionOptions } from '../Componente generico/ConfigOptions';
import { materiaOptions } from '../Componente generico/ConfigOptions';
import SelectorMesAno from './BotonMesAno';

export default function BotonesRegistroMensual() {
  const [grado, setGrado] = React.useState("");
  const [seccion, setSeccion] = React.useState("");
  const [materia, setMateria] = React.useState("");
  const [fechaActual, setFechaActual] = React.useState(new Date());
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <DropdownSelector
        label="Año"
        options={gradoOptions}
        value={grado}
        onChange={(e) => setGrado(e.target.value)}
      />

      <DropdownSelector
        label="Sección"
        options={seccionOptions}
        value={seccion}
        onChange={(e) => setSeccion(e.target.value)}
      />

      <DropdownSelector
        label="Materia"
        options={materiaOptions}
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
      />

      <SelectorMesAno 
        fechaActual={fechaActual} 
        onFechaChange={setFechaActual} 
      />
    </Box>
  )
}