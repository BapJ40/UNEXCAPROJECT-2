import React, { useState, useMemo, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import BotonesRegistroMensual from './BotonesRegistroMensual';
import TablaRegistroMensual from './TablaRegistoMensual';
import estudiantes from '../../Estudiantes'; // Importamos la lista completa de estudiantes

export default function RegistroMensual() {
  // 1. El estado de TODOS los filtros vive aquí, en el padre.
  const [añoSeleccionado, setAñoSeleccionado] = useState('');
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [fechaActual, setFechaActual] = useState(new Date());

  // 2. Generamos las opciones para los selectores dinámicamente.
  const añoOptions = useMemo(() => {
    const añosUnicos = [...new Set(estudiantes.map(est => est.año))];
    return añosUnicos.map(año => ({ value: año, label: año }));
  }, []);

  const seccionOptions = useMemo(() => {
    const seccionesUnicas = [...new Set(estudiantes.map(est => est.seccion))];
    return seccionesUnicas.map(seccion => ({ value: seccion, label: `Sección ${seccion}` }));
  }, []);

  // 3. Filtramos los estudiantes basado en año y sección.
  const estudiantesFiltrados = useMemo(() => {
    if (!añoSeleccionado || !seccionSeleccionada) return [];
    return estudiantes.filter(est => 
      est.año === añoSeleccionado && est.seccion === seccionSeleccionada
    );
  }, [añoSeleccionado, seccionSeleccionada]);

  // 4. Generamos las opciones de materia a partir de los estudiantes ya filtrados.
  const materiaOptionsDinamicas = useMemo(() => {
    if (estudiantesFiltrados.length === 0) return [];
    const todasLasMaterias = estudiantesFiltrados.flatMap(est => est.materias);
    const materiasUnicas = [...new Set(todasLasMaterias)];
    return materiasUnicas.map(materia => ({ value: materia, label: materia }));
  }, [estudiantesFiltrados]);

  // 5. Reiniciamos la materia si cambia el año o la sección.
  useEffect(() => {
    setMateriaSeleccionada('');
  }, [añoSeleccionado, seccionSeleccionada]);

  return (
    <>
      <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>Registro de Asistencias Mensual</Typography>
      <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>...</Typography>

      <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
        {/* 6. Pasamos el estado, los manejadores y las opciones dinámicas al hijo */}
        <BotonesRegistroMensual
          año={añoSeleccionado}
          seccion={seccionSeleccionada}
          materia={materiaSeleccionada}
          fecha={fechaActual}
          onAñoChange={setAñoSeleccionado}
          onSeccionChange={setSeccionSeleccionada}
          onMateriaChange={setMateriaSeleccionada}
          onFechaChange={setFechaActual}
          añoOptions={añoOptions}
          seccionOptions={seccionOptions}
          materiaOptions={materiaOptionsDinamicas}
        />
        {/* 7. Pasamos los estudiantes filtrados y la fecha a la tabla */}
        <TablaRegistroMensual 
          estudiantes={estudiantesFiltrados} 
          fechaSeleccionada={fechaActual} 
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary">Guardar Cambios</Button>
      </Box>
    </>
  );
}