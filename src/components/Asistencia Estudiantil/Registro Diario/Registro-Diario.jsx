import React from 'react'; // Añadimos useEffect
import { Typography, Box, Button } from '@mui/material';
import BotonesRegistros from './Botones-Registros-Diario';
import TablarRegistroDiario from './TablarRegistroDiario';

export default function RegistroDiario( { vistaProfesor = false, fuenteDeDatos } ) {
  // --- ESTADO ---
  // El estado de los filtros se mantiene igual.
  const [añoSeleccionado, setAñoSeleccionado] = React.useState(''); // Usamos un nombre más claro
  const [seccionSeleccionada, setSeccionSeleccionada] = React.useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = React.useState('');
  const [busqueda, setBusqueda] = React.useState('');

  // --- GENERACIÓN DE OPCIONES DINÁMICAS ---

  // 1. Generamos las opciones de AÑO a partir de la lista de estudiantes.
  // useMemo asegura que esto solo se calcule una vez.
  // 2. Las opciones ahora se generan a partir de 'fuenteDeDatos'
  const añoOptions = React.useMemo(() => {
    const añosUnicos = [...new Set(fuenteDeDatos.flatMap(item => item.año))];
    return añosUnicos.map(año => ({ value: año, label: año }));
  }, [fuenteDeDatos]);

  const seccionOptions = React.useMemo(() => {
    const seccionesUnicas = [...new Set(fuenteDeDatos.flatMap(item => item.seccion))];
    return seccionesUnicas.map(seccion => ({ value: seccion, label: `Sección ${seccion}` }));
  }, [fuenteDeDatos]);

  // 3. Filtramos los datos que nos pasaron
  const datosFiltrados = React.useMemo(() => {
    if (!fuenteDeDatos) return [];
    let datosTemp = fuenteDeDatos;

    // Si no es vista de profesor, aplicamos los filtros de año y sección
    if (!vistaProfesor) {
        if (añoSeleccionado && seccionSeleccionada) {
            datosTemp = datosTemp.filter(item => item.año === añoSeleccionado && item.seccion === seccionSeleccionada);
        } else {
            return []; // No mostrar nada si no se selecciona año y sección en vista estudiante
        }
    }
    
    if (busqueda) {
      datosTemp = datosTemp.filter(item => item.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    }
    
    return datosTemp;
  }, [añoSeleccionado, seccionSeleccionada, busqueda, fuenteDeDatos, vistaProfesor]);

  const materiaOptionsDinamicas = React.useMemo(() => {
    const prop = vistaProfesor ? 'asignaturas' : 'materias';
    const todasLasMaterias = datosFiltrados.flatMap(item => item[prop]);
    const materiasUnicas = [...new Set(todasLasMaterias)];
    return materiasUnicas.map(materia => ({ value: materia, label: materia }));
  }, [datosFiltrados, vistaProfesor]);


  // 5. EFECTO PARA REINICIAR LA MATERIA
  // Si el usuario cambia el año o la sección, la materia seleccionada anteriormente
  // podría ya no ser válida. La reiniciamos para forzar una nueva selección.
  React.useEffect(() => {
    setMateriaSeleccionada('');
  }, [añoSeleccionado, seccionSeleccionada]);

  const filtrosActivos = vistaProfesor || (añoSeleccionado && seccionSeleccionada && materiaSeleccionada);

  return (
    <>
      <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>Registro de Asistencias</Typography>
      <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
        Aquí puedes registrar y gestionar las asistencias diarias de los estudiantes.
      </Typography>
      
      <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
        {/* Pasamos las opciones DINÁMICAS al componente de botones */}
        <BotonesRegistros
          año={añoSeleccionado}
          seccion={seccionSeleccionada}
          materia={materiaSeleccionada}
          busqueda={busqueda}
          onAñoChange={setAñoSeleccionado}
          onSeccionChange={setSeccionSeleccionada}
          onMateriaChange={setMateriaSeleccionada}
          onBusquedaChange={setBusqueda}
          añoOptions={añoOptions}
          seccionOptions={seccionOptions}
          materiaOptions={materiaOptionsDinamicas}
          vistaProfesor={vistaProfesor}
          registroDiario={true}
          registroMensual={false}
        />

        { filtrosActivos ?
        
          // Si los filtros están activos, mostramos la tabla.
          <TablarRegistroDiario fuenteDeDatos={datosFiltrados} vistaProfesor={vistaProfesor} /> : (
            // SI NO, mostramos el cuadro de ayuda.
            <Box sx={{  
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px dashed #ccc',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              height: '250px',
              mt: 3
            }}>
              <Typography variant="h6" color="text.secondary">
                Seleccione un Año, una Sección y Materia para ver los registros.
              </Typography>
            </Box>
          )
        }
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" disabled={!filtrosActivos}>
          Guardar Cambios
        </Button>
      </Box>
    </>
  );
}