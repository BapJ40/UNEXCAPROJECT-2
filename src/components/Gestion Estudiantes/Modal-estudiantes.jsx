// Archivo: Modalestudiantes.js (versión refactorizada)
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import ModalGenerico from '../Componente generico/ModalGenerico'; // <- Importamos nuestro nuevo modal genérico
import Tablamaterias from './Tabla-materias';

export default function Modalestudiantes({ open, onClose, estudiante, titulo }) {
    // Las props 'isEdit' y 'isView' ya no se necesitan aquí,
    // ya que la lógica de qué mostrar se decide por el contenido que se pasa.

    return (
        // Usamos el GenericModal como el contenedor principal
        <ModalGenerico open={open} onClose={onClose} titulo={titulo}>
            
            {/* Todo el contenido específico del estudiante se pasa como 'children' */}
            {estudiante ? ( // Verificamos que 'estudiante' exista
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
                            <strong>Cédula:</strong><br /> 
                            {estudiante.cedula}
                        </Typography>
                        <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
                            <strong>Año:</strong><br /> 
                            {estudiante.año}
                        </Typography>
                        <Typography variant='subtitle2' align='center' sx={{ mt: 2, mr: 2 }}>
                            <strong>Sección:</strong><br /> 
                            {estudiante.seccion}
                        </Typography>
                        <Typography variant='subtitle2' sx={{ mt: 2, mr: 2 }}>
                            <strong>Estado:</strong><br /> 
                            {estudiante.estado}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                        <Typography>
                            <Typography component={"span"} variant='subtitle2' >
                            <strong>Nombre:</strong><br /> 
                            </Typography>
                            {estudiante.nombre}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant='subtitle2' >
                            <strong>Asistencias:</strong><br /> 
                            </Typography>
                            <Typography sx={{ bgcolor: estudiante.asistencias >= 200 ? 'green' : 'red', color: 'white', px: 1, py: 0.5, borderRadius: '4px', width: "fit-content" }}> 
                                {estudiante.asistencias}
                            </Typography>
                        </Box>
                    </Box>

                    {/* La tabla de materias también es parte del contenido */}
                    <Box sx={{ mt: 3 }}>
                        <Tablamaterias estudiante={estudiante} />
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