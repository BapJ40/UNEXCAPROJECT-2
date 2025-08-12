import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

const capitalizarMes = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export default function SelectorMesAno({ fechaActual = new Date(), onFechaChange }) {
  // Ahora, si onFechaChange no se pasa, también podría dar problemas. 
  // Hagámoslo más seguro también.
  const irAlMesAnterior = () => {
    if (onFechaChange) {
      onFechaChange(subMonths(fechaActual, 1));
    }
  };

  const irAlMesSiguiente = () => {
    if (onFechaChange) {
      onFechaChange(addMonths(fechaActual, 1));
    }
  };

  // Esta línea ahora está segura porque 'fechaActual' siempre será una fecha válida.
  const textoFecha = capitalizarMes(
    format(fechaActual, "MMMM 'De' yyyy", { locale: es })
  );

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 0.5 }}>
        Mes y Año
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          border: '1px solid #e0e0e0', 
          borderRadius: 1, 
          width: 'fit-content' 
        }}
      >
        <IconButton onClick={irAlMesAnterior} aria-label="mes anterior">
          <ArrowBackIosNew sx={{ fontSize: '1rem' }} />
        </IconButton>
        
        <Typography 
          variant="body1" 
          sx={{ mx: 2, width: '160px', textAlign: 'center', fontWeight: 500 }}
        >
          {textoFecha}
        </Typography>

        <IconButton onClick={irAlMesSiguiente} aria-label="mes siguiente">
          <ArrowForwardIos sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Box>
    </Box>
  );
}