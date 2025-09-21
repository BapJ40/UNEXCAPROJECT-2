import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Box from '@mui/material/Box';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TablaEstudiantes from './Tablas/Tabla-estudiantes';
import ModalAgregarEstudiante from './Modales/ModalAgregarEstudiante';
import FiltrosGestionEstudiantes from './FiltrosGestionEstudiantes';
import estudiantes from '../Estudiantes';

const GestionEstudiantes = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const [añoSeleccionado, setAñoSeleccionado] = React.useState('');
  const [seccionSeleccionada, setSeccionSeleccionada] = React.useState('');
  const [estudianteBuscado, setEstudianteBuscado] = React.useState(null);

  const añoOptions = React.useMemo(() => {
    const añosUnicos = [...new Set(estudiantes.map(est => est.año))];
    return añosUnicos.map(año => ({ value: año, label: año }));
  }, []);

  const seccionOptions = React.useMemo(() => {
    const seccionesUnicas = [...new Set(estudiantes.map(est => est.seccion))];
    return seccionesUnicas.map(seccion => ({ value: seccion, label: `Sección ${seccion}` }));
  }, []);

  const estudianteFiltrados = React.useMemo(() => {
    if (estudianteBuscado) {
      return [estudianteBuscado]
    }
    
    let estudiantesTemp = estudiantes;

    if (añoSeleccionado) {
      estudiantesTemp = estudiantesTemp.filter(est => est.año === añoSeleccionado);
    }

    if (seccionSeleccionada) {
      estudiantesTemp = estudiantesTemp.filter(est => est.seccion === seccionSeleccionada);
    }

    if (!añoSeleccionado && !seccionSeleccionada) {
      return [];
    }

    return estudiantesTemp;
  }, [añoSeleccionado, seccionSeleccionada, estudianteBuscado]);

  const handleEstudianteBuscadoChange = (newvalue) => {
    setEstudianteBuscado(newvalue);
    if (!newvalue) {
      setAñoSeleccionado(null);
      setSeccionSeleccionada(null);
    }
  }

  const mostrarTabla = (añoSeleccionado && seccionSeleccionada) || estudianteBuscado;


    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Gestión de Estudiantes
            </Typography>
            <Typography variant="subtitle1" sx={{ margin: 0, color: 'text.secondary' }}>
              Administra la información y registros de los estudiantes
            </Typography>
          </Box>
          
          <Box>
            <Button startIcon={<FileUploadIcon/>} variant="outlined" size="large" sx={{ fontSize: '15px', py: 1, mx: 2}}>
              Importar
            </Button>
            <Button onClick={() => setModalOpen(true)} startIcon={<GroupAddIcon/>} variant="contained" size="large" sx={{ fontSize: '15px', py: 1, mx: 2}}>
              Agregar Nuevo Estudiante 
            </Button>
          </Box>
        </Box>
        
        <FiltrosGestionEstudiantes año={añoSeleccionado} onAñoChange={setAñoSeleccionado} añoOptions={añoOptions}
        seccion={seccionSeleccionada} onSeccionChange={setSeccionSeleccionada} seccionOptions={seccionOptions}
        todosLosEstudiantes={estudiantes} estudianteBuscado={estudianteBuscado} onEstudianteBuscadoChange={handleEstudianteBuscadoChange} />

        <Box sx={{ p: 4, m: 4, borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Lista de Estudiantes
          </Typography>

          { mostrarTabla ? (
          // SI 'mostrarTabla' es TRUE, renderizamos la tabla con los datos filtrados.
          <TablaEstudiantes estudiantes={estudianteFiltrados} />
        ) : (
          // SI 'mostrarTabla' es FALSE, renderizamos el cuadro de ayuda.
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
            height: '200px', // Le damos algo de altura para que sea visible
            mt: 2
          }}>
            <Typography variant="h6" color="text.secondary">
              Seleccione un Año y una Sección para mostrar los estudiantes.
            </Typography>
          </Box>
        )}
        </Box>

        <ModalAgregarEstudiante open={modalOpen} onClose={() => setModalOpen(false)} datosAeditar={estudianteFiltrados} />
      </>
    );
}

export default GestionEstudiantes;
