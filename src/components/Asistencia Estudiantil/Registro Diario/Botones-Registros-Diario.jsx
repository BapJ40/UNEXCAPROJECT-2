import React from 'react'
import Box from '@mui/material/Box';
import BotonFecha from './Boton-Fecha';
import DropdownSelector from '../Componente generico/BotonGrado';
import { gradoOptions } from '../Componente generico/ConfigOptions';
import { seccionOptions } from '../Componente generico/ConfigOptions';
import { materiaOptions } from '../Componente generico/ConfigOptions';
import Barradebusqueda from '../../Gestion Docentes/Barra-de-busqueda';

export default function BotonesRegistrosDiario() {
  const [grado, setGrado] = React.useState("");
  const [seccion, setSeccion] = React.useState("");
  const [materia, setMateria] = React.useState("");
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <BotonFecha />
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

      <Barradebusqueda 
        label="Buscar Estudiante"
        placeholder="Buscar por nombre o ID"
        sx={{ width: '300px', marginLeft: '16px' }}
      />
    </Box>
  )
}