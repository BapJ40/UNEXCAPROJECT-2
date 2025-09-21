import React from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography // Para mostrar el error
} from '@mui/material';

// 1. AÑADIMOS 'name' a la lista de props que aceptamos
export default function DropdownSelector({ 
  label, 
  options, 
  value, 
  onChange,
  name, // <-- AÑADIDO
  error = null,
  ...other
}) {
  const currentValue = value || '';

  const handleChange = (event) => {
    // 2. CREAMOS UN EVENTO PERSONALIZADO
    // Creamos un nuevo objeto 'target' que incluye el 'name' que recibimos por props.
    const customEvent = {
      target: {
        name: name, // <-- AÑADIDO: Incluimos el nombre del campo
        value: event.target.value,
      },
    };
    // 3. LLAMAMOS AL ONCHANGE DEL PADRE CON EL NUEVO EVENTO
    // Ahora, tu 'handleInputChange' recibirá { target: { name: 'seccion', value: 'A' } }
    // y sabrá exactamente qué hacer.
    onChange(customEvent);
  };

  return (
    <Box sx={{ minWidth: 210 }}>
      <FormControl fullWidth error={!!error}>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          name={name} // <-- AÑADIDO: Pasamos el name al Select subyacente
          value={currentValue}
          label={label}
          onChange={handleChange} // <-- AHORA USAMOS NUESTRO PROPIO MANEJADOR
          {...other}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {/* Mostramos el texto de error si existe */}
        {error && <Typography variant="caption" color="error" sx={{ ml: 2 }}>{error}</Typography>}
      </FormControl>
    </Box>
  );
}