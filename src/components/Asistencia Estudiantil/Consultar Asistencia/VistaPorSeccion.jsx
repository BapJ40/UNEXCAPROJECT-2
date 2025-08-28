import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DropdownSelector from '../../Componente generico/BotonGrado';
import GenericTable from '../../Componente generico/TablaBase'; // <-- Usaremos la tabla base directamente

export default function VistaPorSeccion({ todosLosEstudiantes }) {
  // --- ESTADO Y GENERACIÓN DE OPCIONES (SIN CAMBIOS) ---
  const [año, setAño] = useState('');
  const [seccion, setSeccion] = useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');

  const añoOptions = useMemo(() => {
    const añosUnicos = [...new Set(todosLosEstudiantes.map(est => est.año))];
    return añosUnicos.map(a => ({ value: a, label: a }));
  }, [todosLosEstudiantes]);

  const seccionOptions = useMemo(() => {
    const seccionesUnicas = [...new Set(todosLosEstudiantes.map(est => est.seccion))];
    return seccionesUnicas.map(s => ({ value: s, label: `Sección ${s}` }));
  }, [todosLosEstudiantes]);

  const estudiantesFiltrados = useMemo(() => {
    if (!año || !seccion) return [];
    return todosLosEstudiantes.filter(est => est.año === año && est.seccion === seccion);
  }, [año, seccion, todosLosEstudiantes]);

  const materiaOptions = useMemo(() => {
    if (estudiantesFiltrados.length === 0) return [];
    const materiasUnicas = [...new Set(estudiantesFiltrados.flatMap(est => est.materias))];
    return materiasUnicas.map(m => ({ value: m, label: m }));
  }, [estudiantesFiltrados]);
  
  useEffect(() => setMateriaSeleccionada(''), [año, seccion]);

  // V V V --- NUEVA LÓGICA PARA PREPARAR LOS DATOS DE LA TABLA --- V V V

  // 1. Preparamos los datos específicos para la tabla
  const datosParaTabla = useMemo(() => {
    // Si no se ha seleccionado una materia, no mostramos datos en la tabla.
    if (!materiaSeleccionada) return [];

    return estudiantesFiltrados.map(est => {
      // Usamos la misma lógica que en la vista de detalle para encontrar la asistencia
      let asistencia = 0; // Valor por defecto
      if (est.asistencias) { // Asegurarnos de que el estudiante tenga el objeto de asistencias
        const asistenciaKey = Object.keys(est.asistencias).find(
          key => key.toLowerCase() === materiaSeleccionada.toLowerCase()
        );
        if (asistenciaKey) {
          asistencia = est.asistencias[asistenciaKey];
        }
      }
      
      return {
        id: est.cedula,
        nombre: est.nombre,
        asistenciaMateria: asistencia
      };
    });
  }, [estudiantesFiltrados, materiaSeleccionada]);

  // 2. Definimos las columnas dinámicamente
  const columnasTabla = [
    { 
      field: 'nombre', 
      headerName: 'Nombre del Estudiante', 
      align: 'left' 
    },
    {
      field: 'asistenciaMateria',
      // ¡El encabezado de la columna cambia según la materia seleccionada!
      headerName: `Asistencias en ${materiaSeleccionada}`,
      align: 'center',
      component: ({ value }) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Los selectores no cambian */}
        <DropdownSelector label="Año" options={añoOptions} value={año} onChange={(e) => setAño(e.target.value)} />
        <DropdownSelector label="Sección" options={seccionOptions} value={seccion} onChange={(e) => setSeccion(e.target.value)} />
        <DropdownSelector label="Materia" options={materiaOptions} value={materiaSeleccionada} onChange={(e) => setMateriaSeleccionada(e.target.value)} disabled={materiaOptions.length === 0} />
      </Box>

      {/* 3. Renderizado condicional */}
      {materiaSeleccionada ? (
        // Si hay una materia seleccionada, mostramos la tabla con los datos preparados
        <GenericTable
          columns={columnasTabla}
          data={datosParaTabla}
          containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e-0', mt: 2 } }}
        />
      ) : (
        // Si no, mostramos un mensaje de ayuda
        <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
          Por favor, seleccione una materia para ver el historial de asistencias.
        </Typography>
      )}
    </Box>
  );
}