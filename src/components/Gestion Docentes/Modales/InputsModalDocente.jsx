import React, { useState } from 'react';
import { Box, Button, Grid, Typography,} from '@mui/material';
import GenericTextField from '../../Componente generico/TextfildGenerico'; // <-- Importamos nuestro componente
import DropdownSelector from '../../Componente generico/BotonGrado'; // <-- Importamos el selector desplegable
import { gradoOptions, seccionOptions, materiaOptions } from '../../Componente generico/ConfigOptions';

// Valores iniciales del formulario
const initialValues = {
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

export default function InputsModalDocente() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Función de validación
  const validate = () => {
    let tempErrors = {};
    if (!values.cedula) {
        tempErrors.cedula = "La cedula es requerida.";
    }
    if (!values.nombres) {
        tempErrors.nombres = "Los nombres son requeridos.";
    }
    if (!values.apellidos) {
        tempErrors.apellidos = "Los apellidos son requeridos.";
    }
    if (!values.fechaNacimiento) {
        tempErrors.fechaNacimiento = "La fecha de nacimiento es requerida.";
    }

    setErrors(tempErrors);
    
    // Devuelve true si el objeto de errores está vacío
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (validate()) {
      // Si la validación es exitosa, aquí enviarías los datos a tu API
      console.log("Formulario válido, enviando datos del docente:", values);
    alert("Docente registrado exitosamente.");
    setValues(initialValues);
    setErrors({});
    } else {
      // Si la validación falla, puedes mostrar un mensaje de error
      console.log("El formulario contiene errores.");
      alert("Por favor, corrige los errores en el formulario.");
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      noValidate
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Datos Personales
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="cedula"
            label="Cédula de Identidad"
            value={values.cedula}
            onChange={handleInputChange}
            error={errors.cedula}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="nombres"
            label="Nombres"
            value={values.nombres}
            onChange={handleInputChange}
            error={errors.nombres}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="apellidos"
            label="Apellidos"
            value={values.apellidos}
            onChange={handleInputChange}
            error={errors.apellidos}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            value={values.fechaNacimiento}
            onChange={handleInputChange}
            error={errors.fechaNacimiento}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="numeroTelefono"
            label="Número de Telefono"
            value={values.numeroTelefono}
            onChange={handleInputChange}
            error={errors.numeroTelefono}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="email"
            label="Correo Electronico"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        Areas de Enseñanza
      </Typography>
        <Grid item xs={12}>
          <DropdownSelector
            label="Año Escolar Asignado"
            name="gradosAsignados" // <-- El 'name' debe coincidir con la clave en 'initialValues'
            options={gradoOptions}
            value={values.gradosAsignados} // <-- Leemos del estado 'values'
            onChange={handleInputChange} // <-- Usamos el manejador único
            multiple
          />
        </Grid>
        <Grid item xs={12}>
          <DropdownSelector
            label="Secciones Asignadas"
            name="seccionesAsignadas" // <-- El 'name' debe coincidir
            options={seccionOptions}
            value={values.seccionesAsignadas} // <-- Leemos del estado 'values'
            onChange={handleInputChange} // <-- Usamos el manejador único
            multiple
          />
        </Grid>
        <Grid item xs={12}>
          <DropdownSelector
            label="Materias que Imparte"
            name="asignaturas" // <-- El 'name' debe coincidir
            options={materiaOptions}
            value={values.asignaturas} // <-- Leemos del estado 'values'
            onChange={handleInputChange} // <-- Usamos el manejador único
            multiple
          />
        </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrar Docente
      </Button>
    </Box>
  );
}