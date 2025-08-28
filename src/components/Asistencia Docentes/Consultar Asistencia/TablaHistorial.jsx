import React from 'react';
import {
  Box,
} from '@mui/material';
import GenericTable from '../../Componente generico/TablaBase'; // Asegúrate que la ruta a tu tabla sea correcta

// --- DATOS DE EJEMPLO MEJORADOS Y ORDENADOS ---

// 1. Los datos ahora tienen el total como porcentaje y están ordenados de menor a mayor.
const datosTablaEjemplo = [
  { id: 3, nombre: 'María López',      dia_1: 'A', dia_4: 'A', dia_5: 'A', dia_6: 'J', dia_7: 'P', dia_8: 'P', dia_11: 'P', dia_12: 'P', total: '50%' },
  { id: 5, nombre: 'Carmen Hernández', dia_1: 'P', dia_4: 'P', dia_5: 'T', dia_6: 'P', dia_7: 'A', dia_8: 'A', dia_11: 'P', dia_12: 'P', total: '63%' },
  { id: 1, nombre: 'Ana García',       dia_1: 'P', dia_4: 'P', dia_5: 'A', dia_6: 'P', dia_7: 'P', dia_8: 'T', dia_11: 'P', dia_12: 'J', total: '75%' },
  { id: 2, nombre: 'Carlos Rodríguez', dia_1: 'P', dia_4: 'T', dia_5: 'P', dia_6: 'P', dia_7: 'P', dia_8: 'P', dia_11: 'P', dia_12: 'P', total: '100%' },
  { id: 4, nombre: 'José Martínez',    dia_1: 'P', dia_4: 'P', dia_5: 'P', dia_6: 'P', dia_7: 'P', dia_8: 'P', dia_11: 'P', dia_12: 'P', total: '100%' },
];

// --- FUNCIONES AUXILIARES ---

// 2. Usaremos la función de color que devuelve un código de color para el fondo.
const getAsistenciaColor = (status) => {
  switch (status) {
    case 'P': return '#4CAF50'; // Presente (verde)
    case 'T': return '#FFC107'; // Tarde (amarillo/naranja)
    case 'A': return '#F44336'; // Ausente (rojo)
    case 'J': return '#BDBDBD'; // Justificado (gris)
    default: return '#FFFFFF';  // En blanco / sin datos
  }
};


export default function ConsultarAsistenciaConColores() {

  const diasHabilesEjemplo = Array.from({ length: 31 }, (_, i) => i + 1);

  const columnasTabla = [
    { field: 'nombre', headerName: 'Estudiante', align: 'left' },
    
    // 3. CAMBIO PRINCIPAL: Mapeamos los días para mostrar un Box de color.
    ...diasHabilesEjemplo.map(dia => ({
      field: `dia_${dia}`,
      headerName: dia.toString(),
      align: 'center',
      // En lugar de un Chip, renderizamos un Box con el color de fondo correspondiente.
      component: ({ value }) => (
        <Box sx={{
          width: '30px',
          height: '30px',
          borderRadius: 1,
          bgcolor: getAsistenciaColor(value),
          border: '1px solid #e0e0e0' // Un borde sutil para los días en blanco
        }} />
      ),
    })),

    { field: 'total', headerName: 'Total', align: 'center' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* --- LA TABLA GENÉRICA CON EL NUEVO ESTILO --- */}
      <GenericTable
        columns={columnasTabla}
        data={datosTablaEjemplo}
        cellSx={{ p: 0.5, minWidth: '40px', textAlign: 'center' }}
        containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0', mt: 2 } }}
      />
    </Box>
  );
}