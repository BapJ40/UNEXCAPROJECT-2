import React from 'react'
import Box from '@mui/material/Box';
import SelectorMesAno from './BotoneMesAno';

export default function BotonesRegistroMensual() {
  const [fechaActual, setFechaActual] = React.useState(new Date());
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
      <SelectorMesAno 
        fechaActual={fechaActual} 
        onFechaChange={setFechaActual} 
      />
    </Box>
  )
}