import React from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import GenericTable from '../../Componente generico/TablaBase'; // Ajusta la ruta a tu tabla genérica

// --- DATOS SIMULADOS (HARDCODED) ---

// 1. Datos para el gráfico de estadísticas semanales
const estadisticasSemanales = [
  { semana: 'Semana 1', porcentaje: 85 },
  { semana: 'Semana 2', porcentaje: 90 },
  { semana: 'Semana 3', porcentaje: 75 },
  { semana: 'Semana 4', porcentaje: 92 },
];

// 2. Datos para la tabla detallada (ya ordenados por menor porcentaje)
const datosAsistenciaDetallada = [
  { id: 3, nombre: 'María López',      dia_1: 'A', dia_2: 'A', dia_3: 'A', dia_4: 'J', total: '40%' },
  { id: 5, nombre: 'Carmen Hernández', dia_1: 'P', dia_2: 'T', dia_3: 'P', dia_4: 'A', total: '65%' },
  { id: 1, nombre: 'Ana García',       dia_1: 'P', dia_2: 'P', dia_3: 'A', dia_4: 'P', total: '75%' },
  { id: 2, nombre: 'Carlos Rodríguez', dia_1: 'P', dia_2: 'P', dia_3: 'T', dia_4: 'P', total: '85%' },
  { id: 4, nombre: 'José Martínez',    dia_1: 'P', dia_2: 'P', dia_3: 'P', dia_4: 'P', total: '100%' },
];

// --- FUNCIONES AUXILIARES ---

// Función para determinar el color de la asistencia
const getAsistenciaColor = (status) => {
  switch (status) {
    case 'P': // Presente (verde)
      return '#4CAF50';
    case 'T': // Tarde (amarillo/naranja)
      return '#FFC107';
    case 'A': // Ausente (rojo)
      return '#F44336';
    case 'J': // Justificado (gris claro)
      return '#BDBDBD';
    default:
      return '#E0E0E0'; // No registrado / En blanco
  }
};

export default function TablaReportes() {
  
  // 3. Definición de columnas de la tabla detallada
  const columnasReportes = [
    { field: 'nombre', headerName: 'Estudiante', align: 'left' },
    // Días de ejemplo (simulando los días del mes)
    {
      field: 'dia_1', headerName: 'Día 1', align: 'center',
      component: ({ value }) => (
        <Box sx={{ bgcolor: getAsistenciaColor(value), width: '30px', height: '30px', borderRadius: 1 }} />
      )
    },
    {
      field: 'dia_2', headerName: 'Día 2', align: 'center',
      component: ({ value }) => (
        <Box sx={{ bgcolor: getAsistenciaColor(value), width: '30px', height: '30px', borderRadius: 1 }} />
      )
    },
    {
      field: 'dia_3', headerName: 'Día 3', align: 'center',
      component: ({ value }) => (
        <Box sx={{ bgcolor: getAsistenciaColor(value), width: '30px', height: '30px', borderRadius: 1 }} />
      )
    },
    {
      field: 'dia_4', headerName: 'Día 4', align: 'center',
      component: ({ value }) => (
        <Box sx={{ bgcolor: getAsistenciaColor(value), width: '30px', height: '30px', borderRadius: 1 }} />
      )
    },
    // Columna de Total
    { 
      field: 'total', 
      headerName: 'Porcentaje Asistencia', 
      align: 'center', 
      component: ({ value }) => (
        <Chip 
          label={value} 
          color={parseInt(value) >= 70 ? 'success' : 'error'} 
          variant="outlined" 
          size="small" 
        />
      )
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      {/* --- SECCIÓN DE ESTADÍSTICAS (GRÁFICO) --- */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Estadísticas Mensuales (Porcentaje Semanal)
      </Typography>
      <Paper sx={{ p: 2, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: estadisticasSemanales.map(s => s.semana) }]}
          series={[{ data: estadisticasSemanales.map(s => s.porcentaje), label: 'Porcentaje de Asistencia' }]}
          width={600}
          height={300}
        />
      </Paper>

      {/* --- SECCIÓN DE TABLA DETALLADA --- */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        Asistencia Detallada
      </Typography>
      
      <GenericTable
        columns={columnasReportes}
        data={datosAsistenciaDetallada}
        cellSx={{ p: 0.5, textAlign: 'center' }}
        containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0' } }}
      />
    </Box>
  );
}