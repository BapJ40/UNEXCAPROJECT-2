import React from 'react'
import { Box, Paper, Typography } from '@mui/material';
import BotonesRegistrosAsistencias from '../Asistencia Estudiantil/Botones-Registros-asistencias';
import RegistroDiario from '../Asistencia Estudiantil/Registro Diario/Registro-Diario';
import RegistroMensual from '../Asistencia Estudiantil/Registro Mensual/RegistroMensual';
import ConsultarAsistencia from '../Asistencia Estudiantil/Consultar Asistencia/ConsultarAsistencia';
import Reportes from '../Asistencia Estudiantil/Reporte/Reportes';
import Docente from '../Docentes';

const AsistenciaDocentes = () => {
    const [vistalActual, setVistaActual] = React.useState('diario');
    
      const cambiarVista = (vista) => {
        setVistaActual(vista);
      };
    
      const renderizarVista = () => {
        switch (vistalActual) {
          case 'diario':
            return <RegistroDiario vistaProfesor={true} fuenteDeDatos={Docente} />;
          case 'mensual':
            return <RegistroMensual vistaProfesor={true} fuenteDeDatos={Docente} />;
          case 'historial':
            return <ConsultarAsistencia vistaProfesor={true} fuenteDeDatos={Docente} />;
          case 'reportes':
            return <Reportes vistaProfesor={true} fuenteDeDatos={Docente} />;
          default:
            return <RegistroDiario vistaProfesor={true} fuenteDeDatos={Docente} />;
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
            <BotonesRegistrosAsistencias 
              onCambiarVista={cambiarVista}
              vistaActiva={vistalActual}
            />
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
