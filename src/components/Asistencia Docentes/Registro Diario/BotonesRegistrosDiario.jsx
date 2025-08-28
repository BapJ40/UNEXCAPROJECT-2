import React from 'react'
import Box from '@mui/material/Box';
import BotonFecha from '../../Componente generico/Boton-Fecha';
import Barradebusqueda from '../../Componente generico/Barra-de-busqueda';

export default function BotonesRegistrosDiario() {
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <BotonFecha />

      <Barradebusqueda 
        label="Buscar Estudiante"
        placeholder="Buscar por nombre o ID"
        sx={{ width: '300px', marginLeft: '16px' }}
      />
    </Box>
  )
}