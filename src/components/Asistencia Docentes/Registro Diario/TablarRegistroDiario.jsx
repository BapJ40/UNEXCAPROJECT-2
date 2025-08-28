import React, { useState } from 'react';
import GenericTable from '../../Componente generico/TablaBase';
import Docentes from '../../Docentes';
import { Checkbox, TextField } from '@mui/material';


export default function TablarRegistroDiario() {
  const [attendanceData, setAttendanceData] = useState(
    Docentes.map(e => ({
      id: e.cedula,
      Docente: e.nombre,
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
      field: 'Docente',
      headerName: 'Docente',
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