import React from 'react'
import Box from '@mui/material/Box';
import Barradebusqueda from '../../Componente generico/Barra-de-busqueda';

export default function BotonesHistorial() {  
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Barradebusqueda 
        label="Buscar Estudiante"
        placeholder="Buscar por nombre o ID"
        sx={{ width: '300px', marginLeft: '16px' }}
        />
    </Box>
  )
}