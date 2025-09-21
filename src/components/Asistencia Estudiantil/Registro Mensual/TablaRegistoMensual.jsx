import React, { useState, useEffect } from 'react';
import { Checkbox, Typography } from '@mui/material';
import { getDaysInMonth, isWeekend } from 'date-fns';
import GenericTable from '../../Componente generico/TablaBase';

// Ahora recibe 'estudiantes' como prop
export default function TablaRegistroMensual({ fechaSeleccionada, fuenteDeDatos, vistaProfesor }) {
  const [columnas, setColumnas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    // La guardia ahora también verifica si hay estudiantes para mostrar
    if (!fechaSeleccionada || !fuenteDeDatos) {
      // Limpiamos la tabla si no hay datos
      setColumnas([]);
      setAsistencias([]);
      return; 
    }

    const anio = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();
    const diasDelMes = getDaysInMonth(fechaSeleccionada);
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

    // 3. Definir la estructura completa de las columnas
    let columnasFinales;

    if (vistaProfesor) {
      // Si es la vista de profesor, las columnas son más simples
      columnasFinales = [
        { field: 'nombre', headerName: 'Docente', align: 'left' },
        ...columnasDinamicas,
        { 
          field: 'total', 
          headerName: 'Días Laborados', 
          align: 'center',
          component: ({ rowData }) => {
            const diasMarcados = diasHabiles.filter(dia => rowData[`dia_${dia}`]).length;
            return `${diasMarcados}/${diasHabiles.length}`;
          }
        },
      ];
    } else {
      // Si es la vista de estudiante, usamos las columnas que ya tenías
      columnasFinales = [
        { field: 'nombre', headerName: 'Estudiante', align: 'left' },
        ...columnasDinamicas,
        { 
          field: 'total', 
          headerName: 'Total Asistencias', 
          align: 'center',
          component: ({ rowData }) => {
            const diasMarcados = diasHabiles.filter(dia => rowData[`dia_${dia}`]).length;
            return `${diasMarcados}/${diasHabiles.length}`;
          }
        },
      ];
    }

    setColumnas(columnasFinales);

    const estadoInicialAsistencias = fuenteDeDatos.map(item => {
      const dias = {};
      diasHabiles.forEach(dia => {
        dias[`dia_${dia}`] = false;
      });
      return { id: item.id || item.cedula, nombre: item.nombre, ...dias };
    });
    setAsistencias(estadoInicialAsistencias);

    // Añadimos 'vistaProfesor' a las dependencias para que las columnas se regeneren si cambia el modo
  }, [fechaSeleccionada, fuenteDeDatos, vistaProfesor]); 

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

