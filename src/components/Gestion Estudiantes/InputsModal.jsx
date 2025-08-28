import React, { useState } from 'react';
import { Box, Button, Grid,} from '@mui/material';
import GenericTextField from '../Componente generico/TextfildGenerico'; // <-- Importamos nuestro componente
import DropdownSelector from '../Componente generico/BotonGrado'; // <-- Importamos el selector desplegable
import { gradoOptions, seccionOptions } from '../Componente generico/ConfigOptions';

// Valores iniciales del formulario
const initialValues = {
  cedula: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  numeroTelefono: '',
  email: '',
  seccion: '',
  anoEscolar: '',
  representante: '',
};

export default function InputsModal() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [anoEscolar, setAnoEscolar] = React.useState("");
  const [seccion, setSeccion] = React.useState("");

  // Manejador genérico para todos los campos de texto
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
      console.log("Formulario válido, enviando datos:", values);
      alert("¡Estudiante registrado con éxito!");
      // Opcional: limpiar el formulario
      setValues(initialValues);
      setErrors({});
    } else {
      console.log("El formulario contiene errores.");
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      noValidate
    >
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
        <Grid item xs={12} sm={6}> {/* Modificado */}
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
        <Grid item xs={12} sm={6}> {/* Modificado */}
          <GenericTextField
            name="numeroTelefono"
            label="Número de Telefono"
            value={values.numeroTelefono}
            onChange={handleInputChange}
            error={errors.numeroTelefono}
          />
        </Grid>
        <Grid item xs={12} sm={6}> {/* Modificado */}
          <GenericTextField
            name="email"
            label="Correo Electronico"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
          <GenericTextField
            name="representante"
            label="Nombre del Representante"
            value={values.representante}
            onChange={handleInputChange}
            error={errors.representante}
          />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
            <DropdownSelector
                    label="Sección"
                    options={seccionOptions}
                    value={seccion}
                    onChange={(e) => setSeccion(e.target.value)}
                    error={errors.anoEscolar}
            />
        </Grid>
        <Grid item xs={12}> {/* Modificado */}
            <DropdownSelector
                label="Año Escolar"
                value={anoEscolar}
                options={gradoOptions}
                onChange={(e) => setAnoEscolar(e.target.value)}
                error={errors.anoEscolar}
            />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrar Estudiante
      </Button>
    </Box>
  );
}
