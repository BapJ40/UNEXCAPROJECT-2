import React from 'react'
import TextField from '@mui/material/TextField';

export default function BotonFecha() {
  return (
    <>
        <TextField
      label="Fecha"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{minWidth: '210px'}}
      inputProps={{
        // Opcional: puedes establecer un formato o restricciones
        min: '2020-01-01',
        max: '2030-12-31'
      }}
      defaultValue={new Date().toISOString().split('T')[0]}
    />
    </>
  )
}
