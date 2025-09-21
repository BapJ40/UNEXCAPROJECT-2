import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import GenericTextField from '../../Componente generico/TextfildGenerico';
import DropdownSelector from '../../Componente generico/BotonGrado';

// 1. CORRECCIÓN CRÍTICA: Añadimos los campos de los selectores al estado principal
const initialValuesEstudiante = {
  cedula: '',
  nombre: '',
  apellidos: '',
  fecha_nacimiento: '',
  genero: '', // <-- NUEVO
  direccion: '', // <-- NUEVO
  email: '',
  numeroTelefono: '',
  // Datos del Representante
  nombre_representante: '',
  cedula_representante: '', // <-- NUEVO
  telefono_representante: '', // <-- NUEVO
  // Datos Académicos
  año: '', // <-- CAMBIO DE NOMBRE para consistencia
  seccion: '',
  estado: 'Activo', // <-- NUEVO (con valor por defecto)
};

// Valores iniciales del formulario
const initialValuesDocente = {
  cedula: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  numeroTelefono: '',
  email: '',
  // Campos para los selectores múltiples
  gradosAsignados: [],
  seccionesAsignadas: [],
  asignaturas: [],
   // Es buena idea añadir todos los campos del objeto docente aquí
  cargo: '',
  estado: 'Activo',
};

const gradoOptions = [
  { value: '1er Año', label: '1er Año' },
  { value: '2do Año', label: '2do Año' },
  { value: '3er Año', label: '3er Año' },
  { value: '4to Año', label: '4to Año' },
  { value: '5to Año', label: '5to Año' },
];

const seccionOptions = [
  { value: 'A', label: 'Sección A' },
  { value: 'B', label: 'Sección B' },
  { value: 'C', label: 'Sección C' },
];

// Opciones para los nuevos selectores
const generoOptions = [
  { value: 'Femenino', label: 'Femenino' },
  { value: 'Masculino', label: 'Masculino' },
];

const estadoOptions = [
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Retirado', label: 'Retirado' },
];

export default function InputsModales( { datosAeditar, vistaProfesor = false }) {
  const [values, setValues] = React.useState(vistaProfesor ? initialValuesDocente : initialValuesEstudiante);
  const [errors, setErrors] = React.useState({});

  console.log("Renderizando InputsModales con datosAeditar:", datosAeditar, "y vistaProfesor:", vistaProfesor);

  React.useEffect(() => {
    if (datosAeditar) {
        const initialData = {
            ... (vistaProfesor ? initialValuesDocente : initialValuesEstudiante),
            ...datosAeditar
        };
        setValues(initialData);
        setErrors({});
    } else {
        setValues(vistaProfesor ? initialValuesDocente : initialValuesEstudiante);
        setErrors({});
    }
  }, [datosAeditar, vistaProfesor]);

  // 2. CORRECCIÓN CRÍTICA: Un solo manejador para TODOS los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  // Función de validación
  const validate = () => {
    let tempErrors = {};
    if (!values.cedula) {
        tempErrors.cedula = "La cedula es requerida.";
    }
    if (!values.nombre) {
        tempErrors.nombre = "Los nombres son requeridos.";
    }
    if (!values.apellidos) {
        tempErrors.apellidos = "Los apellidos son requeridos.";
    }
    if (!values.fecha_nacimiento) {
        tempErrors.fecha_nacimiento = "La fecha de nacimiento es requerida.";
    }

    setErrors(tempErrors);
    
    // Devuelve true si el objeto de errores está vacío
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (validate()) {
      setValues(datosAeditar);
      setErrors({});
      alert((vistaProfesor ? "Docente" : "Estudiante") + " registrado exitosamente.");
    } else {
      alert("Por favor, corrige los errores en el formulario.");
    }
  };

 return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h6" gutterBottom>Datos Personales</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Campos comunes: cédula, nombre, apellidos, fecha nacimiento, genero, dirección, email, telefono */}
        <Grid item xs={12} sm={6}><GenericTextField name="cedula" label="Cédula" value={values.cedula} onChange={handleInputChange} /></Grid>
        <Grid item xs={12} sm={6}><GenericTextField name="nombre" label="Nombres" value={values.nombre} onChange={handleInputChange} /></Grid>
        <Grid item xs={12} sm={6}><GenericTextField name="apellidos" label="Apellidos" value={values.apellidos} onChange={handleInputChange} /></Grid>
        <Grid item xs={12} sm={6}><GenericTextField name="fecha_nacimiento" label="Fecha de Nacimiento" type="date" value={values.fecha_nacimiento} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={12} sm={6}><DropdownSelector name="genero" label="Género" options={generoOptions} value={values.genero} onChange={handleInputChange} /></Grid>
        <Grid item xs={12} sm={6}><GenericTextField name="numeroTelefono" label="Número de Teléfono" value={values.numeroTelefono} onChange={handleInputChange} /></Grid>
        <Grid item xs={12}><GenericTextField name="direccion" label="Dirección" value={values.direccion} onChange={handleInputChange} multiline rows={2} /></Grid>
        <Grid item xs={12}><GenericTextField name="email" label="Correo Electrónico" value={values.email} onChange={handleInputChange} /></Grid>
      </Grid>

      {vistaProfesor ? (
        <>
          <Typography variant="h6" gutterBottom>Información Profesional y Áreas de Enseñanza</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><GenericTextField name="cargo" label="Cargo" value={values.cargo} onChange={handleInputChange} /></Grid>
            <Grid item xs={12} sm={6}><DropdownSelector name="estado" label="Estado" options={estadoOptions} value={values.estado} onChange={handleInputChange} /></Grid>
            <Grid item xs={12}><DropdownSelector label="Años Asignados" name="gradosAsignados" options={gradoOptions} value={values.gradosAsignados} onChange={handleInputChange} multiple /></Grid>
            <Grid item xs={12}><DropdownSelector label="Secciones Asignadas" name="seccionesAsignadas" options={seccionOptions} value={values.seccionesAsignadas} onChange={handleInputChange} multiple /></Grid>
            <Grid item xs={12}><DropdownSelector label="Materias que Imparte" name="asignaturas" options={materiaOptions} value={values.asignaturas} onChange={handleInputChange} multiple /></Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>Datos del Representante</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}><GenericTextField name="nombre_representante" label="Nombre del Representante" value={values.nombre_representante} onChange={handleInputChange} /></Grid>
            <Grid item xs={12} sm={6}><GenericTextField name="cedula_representante" label="Cédula del Representante" value={values.cedula_representante} onChange={handleInputChange} /></Grid>
            <Grid item xs={12} sm={6}><GenericTextField name="telefono_representante" label="Teléfono del Representante" value={values.telefono_representante} onChange={handleInputChange} /></Grid>
          </Grid>
          <Typography variant="h6" gutterBottom>Información Académica</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><DropdownSelector name="año" label="Año Escolar" options={gradoOptions} value={values.año} onChange={handleInputChange} /></Grid>
            <Grid item xs={12} sm={6}><DropdownSelector name="seccion" label="Sección" options={seccionOptions} value={values.seccion} onChange={handleInputChange} /></Grid>
            <Grid item xs={12} sm={6}><DropdownSelector name="estado" label="Estado" options={estadoOptions} value={values.estado} onChange={handleInputChange} /></Grid>
          </Grid>
        </>
      )}
      
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {datosAeditar ? 'Guardar Cambios' : `Registrar ${vistaProfesor ? 'Docente' : 'Estudiante'}`}
      </Button>
    </Box>
  );
}