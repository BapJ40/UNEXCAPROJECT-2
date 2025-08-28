import React from 'react'
import { Box, Button, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

export default function BotonesRegistrosAsistencias({ onCambiarVista }) {
  return (
    <>
        <Box>
            <Stack aria-label="outlined primary button group" direction="row" sx={{bgcolor: '#9191917a', py: 0.5, width: "fit-content", borderRadius: 1}}>
                <Button startIcon={<EventIcon />} disableElevation variant="contained" size="small" sx={{ fontSize: '10px', py: 1, mx: 0.5}} 
                onClick={() => onCambiarVista('diario')}>
                    Registro Diario
                </Button>
                <Button startIcon={<CalendarMonthIcon />} disableElevation variant="contained" size="small" sx={{ fontSize: '10px', py: 1, mx: 0.5}}
                onClick={() => onCambiarVista('mensual')}>
                    Registro Mensual
                </Button>
                <Button startIcon={<PersonIcon />} disableElevation variant="contained" size="small" sx={{ fontSize: '10px', py: 1, mx: 0.5}}
                onClick={() => onCambiarVista('historial')}>
                    Consultar Asistencia
                </Button>
                <Button startIcon={<DescriptionIcon />} disableElevation variant="contained" size="small" sx={{ fontSize: '10px', py: 1, mx: 0.5}}
                onClick={() => onCambiarVista('reportes')}>
                    Reportes
                </Button>
            </Stack >
        </Box>
    </>
  )
}