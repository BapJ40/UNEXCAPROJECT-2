// Archivo: Modalestudiantes.js (versión refactorizada)
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ModalGenerico from '../Componente generico/ModalGenerico'; // <- Importamos nuestro nuevo modal genérico
import TablaDoncentes from './TablaDoncentes';
import Estudiantes from '../Estudiantes';

export default function ModalInfoDocente({ open, onClose, docente }) {
    // Las props 'isEdit' y 'isView' ya no se necesitan aquí,
    // ya que la lógica de qué mostrar se decide por el contenido que se pasa.

    return (
        // Usamos el GenericModal como el contenedor principal
        <ModalGenerico open={open} onClose={onClose} titulo="DETALLES DEL DOCENTE">
            
            {/* Todo el contenido específico del estudiante se pasa como 'children' */}
            {docente ? ( // Verificamos que 'estudiante' exista
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
                            <strong>Cédula:</strong><br /> 
                            {docente.cedula}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant='subtitle2' >
                            <strong>Asistencias:</strong><br /> 
                            </Typography>
                             <Typography sx={{ bgcolor: docente.asistencias >= 200 ? 'green' : 'red', color: 'white', px: 1, py: 0.5, borderRadius: '4px', width: "fit-content" }}> 
                                {docente.asistencias}
                            </Typography>
                        </Box>
                        <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
                            <strong>Estado:</strong><br /> 
                            {docente.estado}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                        <Typography>
                            <Typography component={"span"} variant='subtitle2' >
                            <strong>Nombre:</strong><br /> 
                            </Typography>
                            {docente.nombre}
                        </Typography>
                        <Typography>
                            <Typography component={"span"} variant='subtitle2' >
                            <strong>Cargo:</strong><br />
                            </Typography>
                            {docente.cargo}
                        </Typography>
                        <Typography>
                            <Typography component={"span"} variant='subtitle2' >
                            <strong>Email:</strong><br /> 
                            </Typography>
                            {docente.email}
                        </Typography>
                        <Typography>
                            <Typography component={"span"} variant='subtitle2' >
                            <strong>Teléfono:</strong><br /> 
                            </Typography>
                            {docente.telefono}
                        </Typography>
                    </Box>
                    <Typography variant='h6' sx={{ mt: 2, mr: 2 }}>
                        <strong>Areas de Especialización:</strong>
                    </Typography>

                    {/* La tabla de materias también es parte del contenido */}
                    <Box sx={{ mt: 3 }}>
                        <TablaDoncentes todosLosEstudiantes={Estudiantes} docente={docente}/>
                    </Box>
                </>  
            ) : (
                // Es una buena práctica mostrar algo si no hay datos
                <Typography sx={{ my: 3, textAlign: 'center', color: 'text.secondary' }}>
                    No hay información del estudiante para mostrar.
                </Typography>
            )}        
            
        </ModalGenerico>
    );
}