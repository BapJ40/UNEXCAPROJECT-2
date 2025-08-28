import React, { useState, useMemo, useEffect } from 'react'; // Añadimos useEffect
import { Typography, Box, Button } from '@mui/material';
import BotonesRegistrosDiario from './Botones-Registros-Diario';
import TablarRegistroDiario from './TablarRegistroDiario';
import estudiantes from '../../Estudiantes'; // Tu fuente de datos principal

export default function RegistroDiario() {
  // --- ESTADO ---
  // El estado de los filtros se mantiene igual.
  const [añoSeleccionado, setAñoSeleccionado] = useState(''); // Usamos un nombre más claro
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // --- GENERACIÓN DE OPCIONES DINÁMICAS ---

  // 1. Generamos las opciones de AÑO a partir de la lista de estudiantes.
  // useMemo asegura que esto solo se calcule una vez.
  const añoOptions = useMemo(() => {
    const añosUnicos = [...new Set(estudiantes.map(est => est.año))];
    return añosUnicos.map(año => ({ value: año, label: año }));
  }, []); // El array vacío significa que no depende de nada y solo se ejecuta una vez

  // 2. Generamos las opciones de SECCIÓN de la misma manera.
  const seccionOptions = useMemo(() => {
    const seccionesUnicas = [...new Set(estudiantes.map(est => est.seccion))];
    return seccionesUnicas.map(seccion => ({ value: seccion, label: `Sección ${seccion}` }));
  }, []);

  // 3. Filtramos los estudiantes BASADO en las selecciones de año y sección.
  const estudiantesFiltrados = useMemo(() => {
    if (!añoSeleccionado || !seccionSeleccionada) return [];

    return estudiantes.filter(est => 
      est.año === añoSeleccionado && est.seccion === seccionSeleccionada
    );
  }, [añoSeleccionado, seccionSeleccionada]);

  // 4. GENERAMOS LAS OPCIONES DE MATERIA a partir de los estudiantes YA FILTRADOS.
  const materiaOptionsDinamicas = useMemo(() => {
    if (estudiantesFiltrados.length === 0) return [];

    const todasLasMaterias = estudiantesFiltrados.flatMap(est => est.materias);
    const materiasUnicas = [...new Set(todasLasMaterias)];
    
    // Capitalizamos la primera letra para un mejor look
    return materiasUnicas.map(materia => ({ 
      value: materia, 
      label: materia 
    }));
  }, [estudiantesFiltrados]); // Se recalcula cada vez que el grupo de estudiantes cambia

  // 5. EFECTO PARA REINICIAR LA MATERIA
  // Si el usuario cambia el año o la sección, la materia seleccionada anteriormente
  // podría ya no ser válida. La reiniciamos para forzar una nueva selección.
  useEffect(() => {
    setMateriaSeleccionada('');
  }, [añoSeleccionado, seccionSeleccionada]);

  // 6. FILTRO FINAL (incluyendo la barra de búsqueda)
  const datosParaTabla = useMemo(() => {
    if (!busqueda) return estudiantesFiltrados;
    return estudiantesFiltrados.filter(est =>
      est.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [estudiantesFiltrados, busqueda]);

  return (
    <>
      {/* ... (Encabezado sin cambios) ... */}
      <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>Registro de Asistencias</Typography>
      <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
        Aquí puedes registrar y gestionar las asistencias diarias de los estudiantes.
      </Typography>
      
      <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
        {/* Pasamos las opciones DINÁMICAS al componente de botones */}
        <BotonesRegistrosDiario 
          año={añoSeleccionado}
          seccion={seccionSeleccionada}
          materia={materiaSeleccionada}
          busqueda={busqueda}
          onAñoChange={setAñoSeleccionado}
          onSeccionChange={setSeccionSeleccionada}
          onMateriaChange={setMateriaSeleccionada}
          onBusquedaChange={setBusqueda}
          // ¡Aquí pasamos las opciones generadas!
          añoOptions={añoOptions}
          seccionOptions={seccionOptions}
          materiaOptions={materiaOptionsDinamicas}
        />
        
        {/* Pasamos los datos finales a la tabla */}
        <TablarRegistroDiario estudiantesFiltrados={datosParaTabla} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </Box>
    </>
  );
}