import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import VistaPorEstudiante from './VistaPorEstudiante';
import VistaPorSeccion from './VistaPorSeccion';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ConsultarAsistencia({ fuenteDeDatos, vistaProfesor = false }) {
  const [vistaActual, setVistaActual] = React.useState(0); // 0 para la primera pestaña, 1 para la segunda

  const handleChange = (event, newValue) => {
    setVistaActual(newValue);
  };

  return (
    <>
      <Typography variant="h5" sx={{ margin: 0, fontWeight: 'bold' }}>
        Consultar Asistencia
      </Typography>
      <Typography variant="subtitle2" sx={{ margin: 0, color: 'text.secondary', mb: 2 }}>
        Busca el historial de un estudiante individual o de una sección completa.
      </Typography>

      <Box sx={{ width: '100%', mt: 2 }}>
      {vistaProfesor ? (
        <VistaPorEstudiante todosLosEstudiantes={fuenteDeDatos} vistaProfesor={true}/>
      ) : (
        <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={vistaActual} onChange={handleChange} aria-label="pestañas de consulta">
            <Tab label="Por Estudiante" />
            <Tab label="Por Sección" />
          </Tabs>
        </Box>
        <TabPanel value={vistaActual} index={0}>
          {/* Le pasamos la lista completa de estudiantes a esta vista */}
          <VistaPorEstudiante todosLosEstudiantes={fuenteDeDatos} />
        </TabPanel>
        <TabPanel value={vistaActual} index={1}>
          {/* Y también a esta otra */}
          <VistaPorSeccion todosLosEstudiantes={fuenteDeDatos} />
        </TabPanel>
        </>
      )}
      </Box>
    </>
  );
}