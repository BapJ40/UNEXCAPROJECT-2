import React, { useState, useEffect } from 'react';
import GenericTable from '../../Componente generico/TablaBase';
import { Checkbox, TextField } from '@mui/material';

export default function TablarRegistroDiario({ estudiantesFiltrados }) {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    setAttendanceData(
      estudiantesFiltrados.map(e => ({
        id: e.cedula,
        Estudiante: e.nombre,
        Presente: false,
        Justificado: false,
        Tarde: false, // <-- CAMBIO 1: Añadimos el nuevo campo al estado
        Observaciones: ''
      }))
    );
  }, [estudiantesFiltrados]);

  // <-- CAMBIO 2: Actualizamos la lógica de negocio para incluir "Tarde"
  const handleCellChange = (rowIndex, field, newValue) => {
    const updatedData = [...attendanceData];
    const currentRow = updatedData[rowIndex];

    // Aplicamos el cambio del usuario
    currentRow[field] = newValue;

    // Aplicamos las reglas de exclusión
    if (field === 'Presente' && newValue === true) {
      currentRow.Justificado = false;
      currentRow.Tarde = false;
      currentRow.Observaciones = ''; // Limpiamos observaciones si está presente
    } else if (field === 'Justificado' && newValue === true) {
      currentRow.Presente = false;
      currentRow.Tarde = false;
    } else if (field === 'Tarde' && newValue === true) {
      currentRow.Presente = false;
      currentRow.Justificado = false;
    }

    setAttendanceData(updatedData);
  };

  // Los componentes Checkbox y TextField no necesitan cambios
  const CheckboxComponent = ({ value, onChange, disabled = false }) => (
    <Checkbox
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      color="primary"
      disabled={disabled}
    />
  );

  const TextFieldComponent = ({ value, onChange, disabled = false }) => (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      fullWidth
      disabled={disabled}
    />
  );

  // <-- CAMBIO 3: Actualizamos las columnas de la tabla
  const columns = [
    {
      field: 'Estudiante',
      headerName: 'Estudiante',
      align: 'left',
      sx: { fontWeight: 'bold' }
    },
    {
      field: 'Presente',
      headerName: 'Presente',
      align: 'center',
      component: ({ value, onChange, rowData }) => (
        <CheckboxComponent
          value={value}
          onChange={onChange}
          // Se deshabilita si Justificado O Tarde están marcados
          disabled={rowData.Justificado || rowData.Tarde} 
        />
      )
    },
    {
      field: 'Justificado',
      headerName: 'Justificado',
      align: 'center',
      component: ({ value, onChange, rowData }) => (
        <CheckboxComponent
          value={value}
          onChange={onChange}
          // Se deshabilita si Presente O Tarde están marcados
          disabled={rowData.Presente || rowData.Tarde}
        />
      )
    },
    // Añadimos la nueva columna para "Tarde"
    {
      field: 'Tarde',
      headerName: 'Tarde',
      align: 'center',
      component: ({ value, onChange, rowData }) => (
        <CheckboxComponent
          value={value}
          onChange={onChange}
          // Se deshabilita si Presente O Justificado están marcados
          disabled={rowData.Presente || rowData.Justificado}
        />
      )
    },
    {
      field: 'Observaciones',
      headerName: 'Observaciones',
      align: 'left',
      component: ({ value, onChange, rowData }) => (
        <TextFieldComponent
          value={value}
          onChange={onChange}
          // Mantenemos la regla: se deshabilita solo si está 'Presente'
          disabled={rowData.Presente}
        />
      )
    }
  ];
    
  return (
    <>
      <GenericTable
        data={attendanceData}
        columns={columns}
        onCellChange={handleCellChange}
        containerProps={{
          sx: { 
            boxShadow: 3,
            borderRadius: 2,
            mt: 2
          }
        }}
        cellSx={{ py: 1.5, fontSize: '0.875rem' }}
      />
    </>    
  );
}