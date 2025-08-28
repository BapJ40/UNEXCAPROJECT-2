import React, { useMemo } from 'react';
import { Box, Typography, Paper, Chip, Tooltip } from '@mui/material'; // Importamos Tooltip
import { BarChart } from '@mui/x-charts/BarChart';
import GenericTable from '../../Componente generico/TablaBase';
import { getDaysInMonth, isWeekend } from 'date-fns';

const getAsistenciaColor = (status) => {
  switch (status) {
    case 'P': return '#4CAF50'; // Verde
    case 'J': return '#2196F3'; // Azul
    case 'A': return '#F44336'; // Rojo
    case 'T': return '#FFC107'; // Naranja
    default: return '#E0E0E0';  // Gris
  }
};

// Componente de celda con color y tooltip
const CeldaAsistencia = ({ value }) => {
  if (!value) return null; // Si no hay datos, no renderiza nada

  return (
    <Tooltip title={value.observacion || 'Sin observación'} arrow>
      <Box sx={{ 
          bgcolor: getAsistenciaColor(value.status), 
          width: '30px', 
          height: '30px', 
          borderRadius: 1,
          cursor: 'pointer' 
      }} />
    </Tooltip>
  );
};

export default function TablaReportes({ data, fechaSeleccionada }) {
  // Generamos las columnas dinámicamente basado en la fecha
  const columnasReportes = useMemo(() => {
    if (!fechaSeleccionada) return [];

    const diasHabiles = [];
    for (let i = 1; i <= getDaysInMonth(fechaSeleccionada); i++) {
        const dia = new Date(fechaSeleccionada.getFullYear(), fechaSeleccionada.getMonth(), i);
        if (!isWeekend(dia)) diasHabiles.push(i);
    }

    const columnasDias = diasHabiles.map(dia => ({
        field: `dia_${dia}`,
        headerName: dia.toString(),
        align: 'center',
        component: CeldaAsistencia // ¡Usamos nuestro nuevo componente!
    }));

    return [
      { field: 'nombre', headerName: 'Estudiante', align: 'left', sx: { position: 'sticky', left: 0, background: 'white', zIndex: 1 } },
      ...columnasDias,
      { field: 'total', headerName: 'Total', align: 'center' },
    ];
  }, [fechaSeleccionada]);

  if (!data) {
    return (
      <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
        Por favor, seleccione un año y una sección para generar el reporte.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Estadísticas Semanales</Typography>
      <Paper sx={{ p: 2, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: data.estadisticasSemanales.map(s => s.semana) }]}
          series={[{ data: data.estadisticasSemanales.map(s => s.porcentaje), label: 'Asistencia' }]}
          width={600}
          height={300}
        />
      </Paper>

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Asistencia Detallada</Typography>
      <GenericTable
        columns={columnasReportes}
        data={data.datosDetallados}
        cellSx={{ p: 0.5, textAlign: 'center' }}
        containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0', maxWidth: '100%', overflowX: 'auto' } }}
      />
    </Box>
  );
}