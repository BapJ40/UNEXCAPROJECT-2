import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import BotonesRegistros from '../Registro Diario/Botones-Registros-Diario';
import TablaRegistroMensual from './TablaRegistoMensual';

export default function RegistroMensual( { vistaProfesor = false, fuenteDeDatos } ) {
  // 1. El estado de TODOS los filtros vive aquí, en el padre.
  const [añoSeleccionado, setAñoSeleccionado] = React.useState('');
  const [seccionSeleccionada, setSeccionSeleccionada] = React.useState('');
  const [materiaSeleccionada, setMateriaSeleccionada] = React.useState('');
  const [fechaActual, setFechaActual] = React.useState(new Date());

  // 2. Generamos las opciones para los selectores dinámicamente.
  const añoOptions = React.useMemo(() => {
    const añosUnicos = [...new Set(fuenteDeDatos.flatMap(item => item.año))];
    return añosUnicos.map(año => ({ value: año, label: año }));
  }, [fuenteDeDatos]);

  const seccionOptions = React.useMemo(() => {
    const seccionesUnicas = [...new Set(fuenteDeDatos.flatMap(item => item.seccion))];
    return seccionesUnicas.map(seccion => ({ value: seccion, label: `Sección ${seccion}` }));
  }, [fuenteDeDatos]);

  // 3. Filtramos los estudiantes basado en año y sección.
  const estudiantesParaTabla = React.useMemo(() => {
      if (!vistaProfesor && (!añoSeleccionado || !seccionSeleccionada)) {
          return []; // Si no es vista profesor, requerimos año y sección
      }
      
      let datosTemp = fuenteDeDatos;

      if (!vistaProfesor) {
          datosTemp = datosTemp.filter(item => item.año === añoSeleccionado && item.seccion === seccionSeleccionada);
      }
      
      // ¡Quitamos el filtro por materia de aquí!
      
      return datosTemp;
    }, [añoSeleccionado, seccionSeleccionada, fuenteDeDatos, vistaProfesor]);


  // 4. Generamos las opciones de materia a partir de los estudiantes ya filtrados.
  const materiaOptionsDinamicas = React.useMemo(() => {
      const todasLasMaterias = estudiantesParaTabla.flatMap(item => item.materias);
      const materiasUnicas = [...new Set(todasLasMaterias)];
      return materiasUnicas.map(materia => ({ value: materia, label: materia }));
    }, [estudiantesParaTabla]);

  // 5. Reiniciamos la materia si cambia el año o la sección.
  React.useEffect(() => {
    setMateriaSeleccionada('');
  }, [añoSeleccionado, seccionSeleccionada]);

  const filtrosActivos = vistaProfesor || (añoSeleccionado && seccionSeleccionada && materiaSeleccionada);

  return (
    <>
      <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>Registro de Asistencias Mensual</Typography>
      <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>Aquí puedes registrar y gestionar las asistencias mensuales de los estudiantes.</Typography>

      <Box sx={{display: 'flex', flexDirection: 'column', mt: 2 }}>
        {/* 6. Pasamos el estado, los manejadores y las opciones dinámicas al hijo */}
        <BotonesRegistros
          año={añoSeleccionado}
          seccion={seccionSeleccionada}
          materia={materiaSeleccionada}
          onAñoChange={setAñoSeleccionado}
          onSeccionChange={setSeccionSeleccionada}
          onMateriaChange={setMateriaSeleccionada}
          añoOptions={añoOptions}
          seccionOptions={seccionOptions}
          materiaOptions={materiaOptionsDinamicas}
          vistaProfesor={vistaProfesor}
          fecha={fechaActual}
          onFechaChange={setFechaActual}
          registroDiario={false}
          registroMensual={true}
        />
        { filtrosActivos ?
        
          // Si los filtros están activos, mostramos la tabla.
          <TablaRegistroMensual 
            fuenteDeDatos={estudiantesParaTabla}
            fechaSeleccionada={fechaActual}
            vistaProfesor={vistaProfesor}
          /> : (
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
          )} 
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" disabled={!filtrosActivos}>Guardar Cambios</Button>
      </Box>
    </>
  );
}