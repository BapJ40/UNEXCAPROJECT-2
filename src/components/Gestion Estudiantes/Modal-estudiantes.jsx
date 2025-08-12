import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tablamaterias from './Tabla-materias';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export default function Modalestudiantes({open, onClose, estudiante, titulo, isEdit = false, isView = false}) {
    return (
      console.log(`Modalestudiantes - isEdit: ${isEdit}, isView: ${isView}`),
    <>
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
      >
      <Box sx={style}>
        <Typography variant="h6" fontWeight={'bold'} id="modal-modal-title" component="h2" sx={{ textAlign: 'start' }}>
          {titulo}
        </Typography>
        {estudiante && ( // Solo muestra si hay un estudiante seleccionado
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
              <strong>Cédula:</strong><br /> 
              {estudiante.cedula}
            </Typography>
            <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
              <strong>Año:</strong><br /> 
              {estudiante.año}
            </Typography>
            <Typography variant='subtitle2' align='center' sx={{ mt: 2, mr: 2 }}>
              <strong>Seccion:</strong><br /> 
              {estudiante.seccion}
            </Typography>
            <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
              <strong>Estado:</strong><br /> 
              {estudiante.estado}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography sx={{ mt: 2, mr: 2 }}>
              <Typography component={"span"} variant='subtitle2' >
              <strong>Nombre:</strong><br /> 
              </Typography>
              {estudiante.nombre}
            </Typography>
            <Typography component={"span"} sx={{ mt: 2, mr: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='subtitle2' >
              <strong>Asistencias:</strong><br /> 
              </Typography>
              <Typography sx={{ bgcolor: estudiante.asistencias >= 200 ? 'green' : 'red', color: 'white', px: 1, py: 0.5, borderRadius: '4px', width: "fit-content" }}> 
              {estudiante.asistencias}
              </Typography>
            </Typography>
          </Box>
          <Tablamaterias estudiante={estudiante} />
        </>  
        )}        
      </Box>
    </Modal>
    </>
  )
}