import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import TablaReportes from './TablaReportes';
import BotonesReportes from './BotonesReportes';
import estudiantes from '../../Estudiantes'; // Tu lista de estudiantes
import { asistenciaMensualMock } from '../../asistenciaMensualMock';
import { getDaysInMonth, isWeekend, getWeek, format } from 'date-fns';

export default function Reportes() {
  // 1. El estado de los filtros vive aquí
  const [año, setAño] = useState('');
  const [seccion, setSeccion] = useState('');
  const [fechaActual, setFechaActual] = useState(new Date());

  // 2. Generamos las opciones de los selectores dinámicamente
  const añoOptions = useMemo(() => [...new Set(estudiantes.map(e => e.año))].map(a => ({ value: a, label: a })), []);
  const seccionOptions = useMemo(() => [...new Set(estudiantes.map(e => e.seccion))].map(s => ({ value: s, label: `Sección ${s}` })), []);

  // 3. Procesamos TODOS los datos para el reporte aquí
  const reporteData = useMemo(() => {
    if (!año || !seccion) return null; // No hacemos nada si no hay filtros

    const estudiantesDeSeccion = estudiantes.filter(e => e.año === año && e.seccion === seccion);
    const diasHabilesDelMes = [];
    const diasDelMes = getDaysInMonth(fechaActual);
    
    for (let i = 1; i <= diasDelMes; i++) {
        const dia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), i);
        if (!isWeekend(dia)) diasHabilesDelMes.push(dia);
    }

    // Lógica para el gráfico de barras
    const asistenciasPorSemana = {};
    diasHabilesDelMes.forEach(dia => {
        const semana = getWeek(dia);
        if (!asistenciasPorSemana[semana]) asistenciasPorSemana[semana] = { presentes: 0, total: 0 };
        
        const fechaKey = format(dia, 'yyyy-MM-dd'); // Formato '2025-08-01' para buscar
        asistenciasPorSemana[semana].total += estudiantesDeSeccion.length;
        
        estudiantesDeSeccion.forEach(est => {
            const asistenciaDelDia = asistenciaMensualMock[est.cedula]?.[fechaKey];
            if (asistenciaDelDia && asistenciaDelDia.status === 'P') {
                asistenciasPorSemana[semana].presentes++;
            }
        });
    });
    
    const estadisticasSemanales = Object.keys(asistenciasPorSemana).map((semana, index) => ({
        semana: `Semana ${index + 1}`,
        porcentaje: Math.round((asistenciasPorSemana[semana].presentes / asistenciasPorSemana[semana].total) * 100)
    }));
    
    // Lógica para la tabla detallada
    const datosDetallados = estudiantesDeSeccion.map(est => {
        let fila = { id: est.cedula, nombre: est.nombre, presentes: 0 };
        diasHabilesDelMes.forEach(dia => {
            const diaNum = dia.getDate();
            const fechaKey = format(dia, 'yyyy-MM-dd');
            const asistenciaDelDia = asistenciaMensualMock[est.cedula]?.[fechaKey];
            
            if (asistenciaDelDia) {
                if (asistenciaDelDia.status === 'P') fila.presentes++;
                fila[`dia_${diaNum}`] = { 
                    status: asistenciaDelDia.status, 
                    observacion: asistenciaDelDia.observacion 
                };
            } else {
                // Si no hay registro para ese día, lo marcamos como Ausente (A)
                fila[`dia_${diaNum}`] = { 
                    status: 'A', 
                    observacion: 'Sin registro de asistencia' 
                };
            }
        });
        fila.total = diasHabilesDelMes.length > 0
            ? `${Math.round((fila.presentes / diasHabilesDelMes.length) * 100)}%`
            : '0%';
        return fila;
    });

    return { estadisticasSemanales, datosDetallados };

  }, [año, seccion, fechaActual]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 3 }}>
        <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>Reportes de Asistencia</Typography>
        <Typography variant="subtitle1" sx={{ margin: 0, color: 'text.secondary' }}>...</Typography>
      </Box>

      <BotonesReportes
        año={año}
        seccion={seccion}
        fechaActual={fechaActual}
        onAñoChange={setAño}
        onSeccionChange={setSeccion}
        onFechaChange={setFechaActual}
        añoOptions={añoOptions}
        seccionOptions={seccionOptions}
      />
      {/* Pasamos los datos procesados a la tabla */}
      <TablaReportes data={reporteData} fechaSeleccionada={fechaActual} />
    </>
  );
}