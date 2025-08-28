import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import BotonesRegistrosAsistencias from './BotonesRegistrosAsistencias';
import RegistroDiario from './Registro Diario/RegistroDiario';
import RegistroMensual from './Registro Mesual/RegistroMensual';
import ConsultarAsistencia from './Consultar Asistencia/ConsultarAsistencia';
import Reportes from './Reporte/Reportes';

const AsistenciaDocentes = () => {
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
              Asitencia Docentes
            </Typography>
            <Typography variant="subtitle1" sx={{ margin: 0, color: 'text.secondary' }}>
              Gestiona el registro y control de asistencia de los Docentes
            </Typography>
          </Box>
          {/* Botones de acción */}
          <Box>
            <BotonesRegistrosAsistencias onCambiarVista={cambiarVista}/>
          </Box>
    
          {/*Panel de control de asistencias*/}
          <Paper sx={{ p: 2, mt: 2, mr: 2, bgcolor: '#f5f5f5' }}>
            {/* Aquí puedes agregar el contenido del panel de control de asistencias */}
            {renderizarVista()}
          </Paper>
        </>
      )
}

export default AsistenciaDocentes;
