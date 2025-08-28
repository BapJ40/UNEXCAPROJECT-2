import React from 'react'
import DropdownSelector from '../Componente generico/BotonGrado'
import { Box } from '@mui/material';

export default function SelectsModal( { docente, grado, seccion, materia, onGradoChange, onSeccionChange, onMateriaChange } ) {
        
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <DropdownSelector
            label="Seleccione Grado"
            options={docente ? docente.grado.map((grado) => ({ value: grado, label: grado })) : []} 
            value={grado}
            onChange={onGradoChange}
        />

        <DropdownSelector
            label="Seleccione Seccion"
            options={docente ? docente.seccion.map((seccion) => ({ value: seccion, label: seccion })) : []}
            value={seccion}
            onChange={onSeccionChange}
        />

        <DropdownSelector
            label="Seleccione Materia"
            options={docente ? docente.asignaturas.map((asignatura) => ({ value: asignatura, label: asignatura })) : []}
            value={materia}
            onChange={onMateriaChange}
        />
    </Box>
  )
}
