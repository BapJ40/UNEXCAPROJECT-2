import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import BotonesRegistroMensual from './BotonesRegistroMensual';
import TablaRegistroMensual from './TablaRegistoMensual';

export default function RegistroMensual() {
  const [fechaActual, setFechaActual] = React.useState(new Date());
  
  return (
    <>
        {/* Encabezado de la página */}
        <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>
          Registro de Asistencias Mensual
        </Typography>
        <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
          Vista y edición rápida de la asistencia de todo el mes.
        </Typography>

        <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
          <BotonesRegistroMensual />
          <TablaRegistroMensual fechaSeleccionada={fechaActual} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </Box>
    </>
  )
}