import React from 'react'
import { Typography, Box, Button } from '@mui/material'
import BotonesRegistrosDiario from './BotonesRegistrosDiario'
import TablarRegistroDiario from './TablarRegistroDiario';

export default function RegistroDiario() {
  return (
    <>
        {/* Encabezado de la página */}
        <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>
          Registro de Docentes
        </Typography>
        <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
          Aquí puedes registrar y gestionar las asistencias diarias de los Docentes.
        </Typography>

        {/* Aquí puedes agregar el contenido del registro diario */}
        <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
          <BotonesRegistrosDiario />
          <TablarRegistroDiario />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </Box>
    </>
  )
}