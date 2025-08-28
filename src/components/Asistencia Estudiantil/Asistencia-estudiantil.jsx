import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import BotonesRegistrosAsistencias from './Botones-Registros-asistencias';
import RegistroDiario from './Registro Diario/Registro-Diario';
import RegistroMensual from './Registro Mensual/RegistroMensual';
import ConsultarAsistencia from './Consultar Asistencia/ConsultarAsistencia';
import Reportes from './Reporte/Reportes';

export default function AsistenciaEstudiantil() {
  const [vistalActual, setVistaActual] = React.useState('diario');

  const cambiarVista = (vista) => {
    setVistaActual(vista);
  };

  const renderizarVista = () => {
    switch (vistalActual) {
      case 'diario':
        return <RegistroDiario />;
      case 'mensual':
        return <RegistroMensual />;
      case 'historial':
        return <ConsultarAsistencia />;
      case 'reportes':
        return <Reportes />;
      default:
        return <RegistroDiario />;
    }
  };
  
  return (
    <>
      {/* Encabezado de la página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 3 }}>
        <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>
          Asitencia Estudiantil
        </Typography>
        <Typography variant="subtitle1" sx={{ margin: 0, color: 'text.secondary' }}>
          Gestiona el registro y control de asistencia de los estudiantes
        </Typography>
      </Box>
      {/* Botones de acción */}
      <Box>
        <BotonesRegistrosAsistencias 
        onCambiarVista={cambiarVista}
        vistaActiva={vistalActual}/>
      </Box>

      {/*Panel de control de asistencias*/}
      <Paper sx={{ p: 2, mt: 2, mr: 2, bgcolor: '#f5f5f5' }}>
        {/* Aquí puedes agregar el contenido del panel de control de asistencias */}
        {renderizarVista()}
      </Paper>
    </>
  )
}
