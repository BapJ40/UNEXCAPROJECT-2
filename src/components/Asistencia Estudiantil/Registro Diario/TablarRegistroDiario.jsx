import React, { useState } from 'react';
import GenericTable from '../../Gestion Estudiantes/TablaBase';
import estudiantes from '../../Estudiantes';
import { Checkbox, TextField } from '@mui/material';

export default function TablarRegistroDiario() {
  const [attendanceData, setAttendanceData] = useState(
    estudiantes.map(e => ({
      id: e.cedula,
      Estudiante: e.nombre,
      'Grado / Sección': `${e.año} ${e.seccion}`,
      Presente: false,
      Justificado: false,
      Observaciones: ''
    }))
  );

  const handleCellChange = (rowIndex, field, newValue) => {
    const updatedData = [...attendanceData];
    updatedData[rowIndex][field] = newValue;
    setAttendanceData(updatedData);
  };

  const CheckboxComponent = ({ value, onChange }) => (
    <Checkbox
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      color="primary"
    />
  );

  const TextFieldComponent = ({ value, onChange }) => (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      size="small"
      fullWidth
    />
  );

  const columns = [
    {
      field: 'Estudiante',
      headerName: 'Estudiante',
      align: 'left',
      sx: { fontWeight: 'bold' }
    },
    {
      field: 'Grado / Sección',
      headerName: 'Grado / Sección',
      align: 'left',
      sx: { fontWeight: 'bold' }
    },
    {
      field: 'Presente',
      headerName: 'Presente',
      align: 'center',
      component: CheckboxComponent
    },
    {
      field: 'Justificado',
      headerName: 'Justificado',
      align: 'center',
      component: CheckboxComponent
    },
    {
      field: 'Observaciones',
      headerName: 'Observaciones',
      align: 'left',
      component: TextFieldComponent
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