import React from 'react'
import Box from '@mui/material/Box';
import SelectorMesAno from '../Registro Mesual/BotoneMesAno';
import { Button } from '@mui/material';

export default function BotonesReportes() {
  const [fechaActual, setFechaActual] = React.useState(new Date());
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
      <SelectorMesAno 
        fechaActual={fechaActual} 
        onFechaChange={setFechaActual} 
      />
      <Button variant="contained" color="primary">
        Guardar Reporte
      </Button>      
    </Box>
  )
}