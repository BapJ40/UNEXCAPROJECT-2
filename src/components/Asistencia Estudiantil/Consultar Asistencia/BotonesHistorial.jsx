import React from 'react'
import Box from '@mui/material/Box';
import Barradebusqueda from '../../Componente generico/Barra-de-busqueda';
import { materiaOptions } from '../../Componente generico/ConfigOptions';
import DropdownSelector from '../../Componente generico/BotonGrado';

export default function BotonesHistorial() {  
  const [materia, setMateria] = React.useState("");
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Barradebusqueda 
        label="Buscar Estudiante"
        placeholder="Buscar por nombre o ID"
        sx={{ width: '300px', marginLeft: '16px' }}
        />

        <DropdownSelector
                label="Materia"
                options={materiaOptions}
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
        />
    </Box>
  )
}