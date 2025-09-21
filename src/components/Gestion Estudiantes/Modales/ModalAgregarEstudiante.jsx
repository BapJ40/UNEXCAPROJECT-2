import React from 'react'
import ModalGenerico from '../../Componente generico/ModalGenerico'; // <- Importamos nuestro nuevo modal genérico
import { Box, Typography } from '@mui/material';
import InputsModales from './InputsModales';

export default function ModalAgregarEstudiante({ open, onClose, datosAeditar }) {
  return (
    <ModalGenerico open={open} onClose={onClose} titulo="Agregar Nuevo Estudiante">
      {/* Aquí iría el contenido del modal para agregar un estudiante */}
        <Box sx={{ p: 1 }}>
            {/* <InputsModal /> */}
            <InputsModales datosAeditar={datosAeditar}/>
        </Box>
        
    </ModalGenerico>
  )
}