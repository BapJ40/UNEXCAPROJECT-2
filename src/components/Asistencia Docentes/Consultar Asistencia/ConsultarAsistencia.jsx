import React from 'react'
import { Box, Typography } from '@mui/material'
import BotonesHistorial from './BotonesHistorial'
import TablaHistorial from './TablaHistorial'

export default function ConsultarAsistencia() {
  return (
    <>
        <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>
            Consultar Asistencia
        </Typography>
        <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
            Aquí puedes consultar el historial de asistencia de los Docentes.
        </Typography>

        {/* Aquí puedes agregar el contenido del registro diario */}
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
          <BotonesHistorial />
          <TablaHistorial />
        </Box>        
    </>
  )
}
