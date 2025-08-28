import React from 'react';
import { Box } from '@mui/material';
import ModalGenerico from '../Componente generico/ModalGenerico'; // <- Importamos nuestro nuevo modal genérico
import InputsModalDocente from './InputsModalDocente';

export default function ModalAgregarPersonal( { open, onClose } ) {
  return (
    <ModalGenerico open={open} onClose={onClose} titulo="AGREGAR DOCENTE">
        <Box sx={{ p: 1 }}>
            <InputsModalDocente />
        </Box>
    </ModalGenerico>
  )
}
