import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Estilos base para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: 750 }, // Hacemos el ancho un poco responsivo
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1, // Un pequeño borde redondeado para un mejor look
};

// Este es el componente genérico.
// Acepta 'open', 'onClose', 'titulo' y lo más importante: 'children'.
export default function ModalGenerico({ open, onClose, titulo, children, sx = {} }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="generic-modal-title"
    >
      {/* Combinamos los estilos base con cualquier estilo personalizado que se pase */}
      <Box sx={{ ...style, ...sx }}>
        {/* Encabezado del Modal con Título y Botón de Cierre */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="generic-modal-title" variant="h6" component="h2" fontWeight="bold">
            {titulo}
          </Typography>
          <IconButton onClick={onClose} aria-label="cerrar modal">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* --- LA MAGIA ESTÁ AQUÍ --- */}
        {/* Renderizamos cualquier contenido que se pase dentro del componente */}
        {children}

      </Box>
    </Modal>
  );
}