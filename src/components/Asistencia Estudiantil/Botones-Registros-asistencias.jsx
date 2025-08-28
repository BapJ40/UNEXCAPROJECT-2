import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

// 1. Recibimos la nueva prop 'vistaActiva'
export default function BotonesRegistrosAsistencias({ onCambiarVista, vistaActiva }) {
  return (
    <>
      <Box>
        {/* El Stack puede quedar igual, pero quitamos el fondo para un look más limpio */}
        <Stack aria-label="outlined primary button group" direction="row" sx={{ width: "fit-content" }}>
          
          {/* 2. Hacemos el 'variant' condicional para cada botón */}
          <Button 
            startIcon={<EventIcon />} 
            variant={vistaActiva === 'diario' ? 'contained' : 'outlined'} // <-- Lógica aquí
            size="small" 
            sx={{ fontSize: '10px', py: 1, mr: 0.5 }} 
            onClick={() => onCambiarVista('diario')}
          >
            Registro Diario
          </Button>

          <Button 
            startIcon={<CalendarMonthIcon />} 
            variant={vistaActiva === 'mensual' ? 'contained' : 'outlined'} // <-- Lógica aquí
            size="small" 
            sx={{ fontSize: '10px', py: 1, mx: 0.5 }}
            onClick={() => onCambiarVista('mensual')}
          >
            Registro Mensual
          </Button>

          <Button 
            startIcon={<PersonIcon />} 
            variant={vistaActiva === 'historial' ? 'contained' : 'outlined'} // <-- Lógica aquí
            size="small" 
            sx={{ fontSize: '10px', py: 1, mx: 0.5 }}
            onClick={() => onCambiarVista('historial')}
          >
            Consultar Asistencia
          </Button>

          <Button 
            startIcon={<DescriptionIcon />} 
            variant={vistaActiva === 'reportes' ? 'contained' : 'outlined'} // <-- Lógica aquí
            size="small" 
            sx={{ fontSize: '10px', py: 1, ml: 0.5 }}
            onClick={() => onCambiarVista('reportes')}
          >
            Reportes
          </Button>

        </Stack >
      </Box>
    </>
  );
}