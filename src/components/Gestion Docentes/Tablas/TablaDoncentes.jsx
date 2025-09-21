import React from 'react';
import GenericTable from '../../Componente generico/TablaBase';
import SelectsModal from '../Modales/SelectsModal';
import { Typography } from '@mui/material';

export default function TablaDoncentes({ todosLosEstudiantes, docente }) {
  // 1. El estado para los filtros vive aquí, en el padre.
  const [gradoSeleccionado, setGradoSeleccionado] = React.useState('');
  const [seccionSeleccionada, setSeccionSeleccionada] = React.useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = React.useState('');

  // 2. Lógica de filtrado y mapeo de datos.
  const datosFiltrados = React.useMemo(() => {
    // Si no se han seleccionado un grado Y una sección, no mostramos nada.
    if (!gradoSeleccionado || !seccionSeleccionada || !todosLosEstudiantes) {
      return [];
    }

    // Filtramos la lista COMPLETA de estudiantes
    const estudiantesFiltrados = todosLosEstudiantes.filter(estudiante => {
      // AQUÍ ESTÁ LA LÓGICA CLAVE DE CONEXIÓN:
      // Comparamos el 'año' del estudiante con el 'grado' seleccionado del docente.
      return estudiante.año === gradoSeleccionado && estudiante.seccion === seccionSeleccionada;
    });

    // Mapeamos los estudiantes que pasaron el filtro al formato que necesita la tabla
    return estudiantesFiltrados.map((est) => {
      let notaFinal = 'Sin nota';

      // Lógica para encontrar la nota sin importar mayúsculas/minúsculas
      if (est.notas && materiaSeleccionada) {
        // Buscamos la clave de la nota (ej. "matemáticas") que coincida con la materia seleccionada (ej. "Matemáticas")
        const notaKey = Object.keys(est.notas).find(
          key => key.toLowerCase() === materiaSeleccionada.toLowerCase()
        );
        if (notaKey) {
          notaFinal = est.notas[notaKey];
        }
      }
      
      return {
        id: est.cedula, // Usar la cédula como ID es más robusto
        nombre: est.nombre,
        nota: notaFinal
      };
    });

  }, [gradoSeleccionado, seccionSeleccionada, materiaSeleccionada, todosLosEstudiantes]);

  // 3. Las columnas de la tabla. El encabezado de la nota es dinámico.
  const columnasTabla = [
    { field: 'nombre', headerName: 'Nombre del Estudiante', align: 'left' },
    { 
      field: 'nota', 
      headerName: materiaSeleccionada ? `Nota en ${materiaSeleccionada}` : 'Seleccione una materia', 
      align: 'center' 
    },
  ];

  return (
    <>
      {/* 4. Pasamos el estado y las funciones de cambio al componente hijo */}
      <SelectsModal 
        docente={docente}
        grado={gradoSeleccionado}
        seccion={seccionSeleccionada}
        materia={materiaSeleccionada}
        onGradoChange={(e) => setGradoSeleccionado(e.target.value)}
        onSeccionChange={(e) => setSeccionSeleccionada(e.target.value)}
        onMateriaChange={(e) => setMateriaSeleccionada(e.target.value)}
      />

      {/* 5. La tabla muestra los datos filtrados o un mensaje de ayuda */}
      {datosFiltrados.length > 0 ? (
        <GenericTable
          data={datosFiltrados}
          columns={columnasTabla}
          containerProps={{ sx: { boxShadow: 'none' } }}
        />
      ) : (
        <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
          Seleccione un grado y una sección para ver los estudiantes correspondientes.
        </Typography>
      )}
    </>
  );
}