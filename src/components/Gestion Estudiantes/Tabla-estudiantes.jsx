import React from 'react';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import Modalestudiantes from './Modal-estudiantes';
import GenericTable from '../Componente generico/TablaBase';

const estudiantes = [
  {
    cedula: "V-12345678",
    nombre: "María González",
    materias: ["Matemáticas", "Física", "Química"],
    seccion: "A",
    año: "5to",
    genero: "Femenino",
    estado: "Activo",
    asistencias: 250,
    notas: { matemáticas: 18, física: 15, química: 17 },
    nombre_representante: "Carlos González",
    fecha_nacimiento: "2005-03-15"
  },
  {
    cedula: "V-87654321",
    nombre: "Juan Pérez",
    materias: ["Historia", "Literatura", "Inglés"],
    seccion: "B",
    año: "3er",
    genero: "Masculino",
    estado: "Activo",
    asistencias: 40,
    notas: { historia: 16, literatura: 19, inglés: 20 },
    nombre_representante: "Ana Pérez",
    fecha_nacimiento: "2006-07-22"
  },
  {
    cedula: "V-56789123",
    nombre: "Luisa Rodríguez",
    materias: ["Biología", "Geografía", "Arte"],
    seccion: "C",
    año: "1er",
    genero: "Femenino",
    estado: "Inactivo",
    asistencias: 30,
    notas: { biología: 14, geografía: 5, arte: 18 },
    nombre_representante: "Pedro Rodríguez",
    fecha_nacimiento: "2005-11-30"
  },
  {
    cedula: "V-98765432",
    nombre: "Carlos López",
    materias: ["Educación Física", "Música", "Informática"],
    seccion: "A",
    año: "2do",
    genero: "Masculino",
    estado: "Activo",
    asistencias: 48,
    notas: { "educación física": 20, música: 17, informática: 19 },
    nombre_representante: "Marta López",
    fecha_nacimiento: "2006-05-10"
  },
  {
    cedula: "V-23456789",
    nombre: "Ana Fernández",
    materias: ["Matemáticas", "Química", "Informática"],
    seccion: "B",
    año: "4to",
    genero: "Femenino",
    estado: "Activo",
    asistencias: 42,
    notas: { matemáticas: 19, química: 16, informática: 18 },
    nombre_representante: "Jorge Fernández",
    fecha_nacimiento: "2005-09-05"
  }
];

const TablaEstudiantes = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = React.useState(null);
  const [titulo, setTitulo] = React.useState("Información del Estudiante");

  const handleAction = (action, estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setTitulo(
      action === 'view' 
        ? "Información del Estudiante" 
        : "Editar Información del Estudiante"
    );
    setModalOpen(true);
  };

  const columns = [
    { field: 'cedula', headerName: 'Cédula' },
    { field: 'nombre', headerName: 'Nombre', align: 'left' },
    { 
      field: 'año', 
      headerName: 'Año/Sección',
      align: 'left',
      render: (value, row) => `${value} ${row.seccion}`
    },
    { field: 'estado', headerName: 'Estado', align: 'left' }
  ];

  const actions = [
    { name: 'view', icon: <VisibilityIcon />, color: 'info' },
    { name: 'edit', icon: <EditNoteIcon />, color: 'warning' },
    { name: 'delete', icon: <DeleteIcon />, color: 'error' }
  ];

  return (
    <>
      <Modalestudiantes 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        estudiante={estudianteSeleccionado}
        titulo={titulo}
        isEdit={titulo.includes("Editar")}
        isView={titulo.includes("Información")}
      />
      
      <GenericTable
        data={estudiantes}
        columns={columns}
        actions={actions}
        onActionClick={handleAction}
        containerProps={{
          component: Paper,
          sx: { 
            minWidth: 650,
            boxShadow: 3
          }
        }}
      />
    </>
  );
};

export default TablaEstudiantes;