import React from 'react';
import { Typography, Grid, Chip, Paper } from '@mui/material';
import { format, differenceInYears } from 'date-fns';

const InfoItem = ({ label, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="body1" align='center'>
      {value || 'No especificado'}
    </Typography>
  </Grid>
);

export default function ModalVerPersona({ data, vistaProfesor = false }) {
  if (!data) return null;

  const edad = data.fecha_nacimiento ? differenceInYears(new Date(), new Date(data.fecha_nacimiento)) : null;
  const totalAsistencias = !vistaProfesor && data.asistencias
    ? Object.values(data.asistencias).reduce((sum, current) => sum + current, 0) : null;

  return (
        <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={'bold'} gutterBottom>Información Personal</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <InfoItem label="Cédula" value={data.cedula} />
          <InfoItem label="Nombre Completo" value={`${data.nombre} ${data.apellidos || ''}`} />
          {edad && <InfoItem label="Fecha de Nacimiento" value={`${format(new Date(data.fecha_nacimiento), 'dd/MM/yyyy')} (${edad} años)`} />}
          <InfoItem label="Género" value={data.genero} />
        </Grid>

        <Typography variant="h6" fontWeight={'bold'} gutterBottom>{vistaProfesor ? 'Información Profesional' : 'Información Académica'}</Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <InfoItem label="Estado" value={<Chip label={data.estado} color={data.estado === 'Activo' ? 'success' : 'error'} size="small" />} />
          {vistaProfesor ? (
            <>
              <InfoItem label="Cargo" value={data.cargo} />
              <InfoItem label="Asignaturas" value={data.asignaturas?.join(', ')} />
            </>
          ) : (
            <>
              <InfoItem label="Año" value={data.año} />
              <InfoItem label="Sección" value={data.seccion} />
              {totalAsistencias !== null && <InfoItem label="Asistencias (Total)" value={<Chip label={totalAsistencias} color={totalAsistencias > 150 ? 'primary' : 'warning'} />} />}
            </>
          )}
        </Grid>

        {!vistaProfesor && (
          <>
            <Typography variant="h6" fontWeight={'bold'} gutterBottom>Información del Representante</Typography>
            <Grid container spacing={2}>
              <InfoItem label="Nombre" value={data.nombre_representante} />
              <InfoItem label="Cédula" value={data.cedula_representante} />
              <InfoItem label="Teléfono" value={data.telefono_representante} />
            </Grid>
          </>
        )}
    </Paper>
  );
}