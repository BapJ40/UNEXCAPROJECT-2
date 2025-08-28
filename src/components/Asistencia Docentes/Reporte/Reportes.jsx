import { Box, Typography } from '@mui/material'
import React from 'react'
import TablaReportes from './TablaReportes'
import BotonesReportes from './BotonesReportes'

export default function Reportes() {
  return (
    <>
        {/* Encabezado de la página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 3 }}>
        <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>
            Reportes de Asistencia Docentes
        </Typography>
        <Typography variant="subtitle1" sx={{ margin: 0, color: 'text.secondary' }}>
            Genera y descarga reportes detallados de asistencia de los Docentes.
        </Typography>
      </Box>

      {/* Aquí puedes agregar el contenido de la página */}
        <BotonesReportes />
        <TablaReportes />
    </>
  )
}
