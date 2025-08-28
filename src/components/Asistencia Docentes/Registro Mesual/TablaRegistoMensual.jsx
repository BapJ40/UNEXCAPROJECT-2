import React, { useState, useEffect } from 'react';
import { Checkbox, Typography } from '@mui/material';
import { getDaysInMonth, isWeekend } from 'date-fns';
import GenericTable from '../../Componente generico/TablaBase'; // Revisa que la ruta sea correcta

// ... (estudiantesMock no cambia)
const estudiantesMock = [
  { id: 1, nombre: 'Ana García' },
  { id: 2, nombre: 'Carlos Rodríguez' },
  { id: 3, nombre: 'María López' },
  { id: 4, nombre: 'José Martínez' },
  { id: 5, nombre: 'Carmen Hernández' },
];


export default function TablaRegistroMensual({ fechaSeleccionada }) {
  const [columnas, setColumnas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    // V V V AQUÍ ESTÁ LA SOLUCIÓN V V V
    // Añadimos una "guardia". Si fechaSeleccionada no existe, no hacemos nada.
    if (!fechaSeleccionada) {
      return; 
    }

    // Ahora el resto del código es seguro, porque sabemos que fechaSeleccionada es una fecha válida.
    const anio = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();
    const diasDelMes = getDaysInMonth(fechaSeleccionada);

    // ... el resto de tu useEffect no necesita cambios ...

    // 1. Generar los días hábiles (lunes a viernes)
    const diasHabiles = [];
    for (let i = 1; i <= diasDelMes; i++) {
      const dia = new Date(anio, mes, i);
      if (!isWeekend(dia)) {
        diasHabiles.push(i);
      }
    }

    // 2. Crear las columnas para la tabla genérica
    const columnasDinamicas = diasHabiles.map((dia) => ({
      field: `dia_${dia}`,
      headerName: dia.toString(),
      align: 'center',
      component: ({ value, onChange }) => (
        <Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      ),
    }));

    // Calcular el total de asistencias para una fila/estudiante
    const calcularTotal = (rowData) => {
        const asistenciasMarcadas = diasHabiles.filter(dia => rowData[`dia_${dia}`]).length;
        return `${asistenciasMarcadas}/${diasHabiles.length}`;
    }

    // 3. Definir la estructura completa de las columnas
    const columnasFinales = [
      { field: 'nombre', headerName: 'Estudiante', align: 'left' },
      ...columnasDinamicas,
      { 
        field: 'total', 
        headerName: 'Total', 
        align: 'center',
        // Usamos el componente para mostrar un valor calculado
        component: ({ rowData }) => <Typography variant="body2">{calcularTotal(rowData)}</Typography>
      },
    ];

    setColumnas(columnasFinales);

    // 4. Inicializar el estado de las asistencias
    const estadoInicialAsistencias = estudiantesMock.map(est => {
      const dias = {};
      diasHabiles.forEach(dia => {
        dias[`dia_${dia}`] = false; // Inicialmente nadie ha asistido
      });
      return { ...est, ...dias };
    });

    setAsistencias(estadoInicialAsistencias);

  }, [fechaSeleccionada]);

  const handleAsistenciaChange = (rowIndex, field, value) => {
    setAsistencias((prevAsistencias) => {
      const nuevasAsistencias = [...prevAsistencias];
      nuevasAsistencias[rowIndex] = {
        ...nuevasAsistencias[rowIndex],
        [field]: value,
      };
      return nuevasAsistencias;
    });
  };

  return (
    <GenericTable
      columns={columnas}
      data={asistencias}
      onCellChange={handleAsistenciaChange}
      // Ajustes de estilo para que se parezca más a la imagen
      cellSx={{ p: 1, border: '1px solid #e0e0e0', textAlign: 'center' }}
      containerProps={{ sx: { boxShadow: 'none', border: '1px solid #e0e0e0' } }}
    />
  );
}