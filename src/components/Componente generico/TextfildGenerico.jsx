// Archivo: GenericTextField.js
import React from 'react';
import { TextField } from '@mui/material';

/**
 * Un componente de TextField genérico y reutilizable.
 *
 * @param {string} name - El nombre del campo, crucial para el manejo de formularios.
 * @param {string} label - El texto que se muestra como etiqueta del campo.
 * @param {string} value - El valor actual del campo, controlado por el estado del padre.
 * @param {function} onChange - La función que se ejecuta cuando el valor cambia.
 * @param {string} [error=null] - Un string con el mensaje de error. Si es null o undefined, no se muestra error.
 * @param {object} ...other - Cualquier otra prop válida para el TextField de Material-UI (e.g., type, disabled, multiline, size).
 */
export default function GenericTextField({ name, label, value, onChange, error = null, ...other }) {
  return (
    <TextField
      // Props estándar para una buena apariencia y funcionalidad por defecto
      variant="outlined"
      fullWidth
      sx={{minWidth: '210px'}}
      
      // Props principales que se pasan desde el componente padre
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      
      // --- Lógica para manejar errores ---
      // El prop 'error' de MUI espera un booleano. Lo convertimos.
      error={!!error} 
      // El prop 'helperText' de MUI muestra el mensaje de error debajo del campo.
      helperText={error}
      
      // Pasamos cualquier otra prop para máxima flexibilidad
      {...other} 
    />
  );
}