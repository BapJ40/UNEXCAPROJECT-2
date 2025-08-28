import React from 'react';
import Button from '@mui/material/Button';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIcon from '@mui/icons-material/Phone';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Barradebusqueda from '../Componente generico/Barra-de-busqueda';
import ModalAgregarPersonal from './ModalAgregarPersonal';
import ModalInfoDocente from './ModalInfoDocente';

const GestionDocentes = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalInfo, setOpenModalInfo] = React.useState(false);
    const [docenteSeleccionado, setDocenteSeleccionado] = React.useState(null);

    const handleOpenModal = (docente) => {
        setDocenteSeleccionado(docente);
        setOpenModalInfo(true);
    };

    const datosDocentes = [
        { id: 1, nombre: 'Juan Pérez', cedula: "123456789", asignaturas: ['Matemáticas', "Ingles"], email: "ejemplo@gmail.com", telefono: "123456789", estado: 'Activo', cargo: 'Profesor Titular', seccion: ['B'], grado: ['4to'], notas: { Matemáticas: 18, Ingles: 14 } },
        { id: 2, nombre: 'María Gómez', cedula: "987654321", asignaturas: ['Historia', "Geografía"], email: "maria.gomez@gmail.com", telefono: "987654321", estado: 'Inactivo', cargo: 'Profesor Asistente', seccion: ['B', 'C'], grado: ['3er', '2do'], notas: { Historia: 13, Geografía: 11 } },
        { id: 3, nombre: 'Carlos Ruiz', cedula: "456123789", asignaturas: ['Física', "Química"], email: "carlos.ruiz@gmail.com", telefono: "456123789", estado: 'Activo', cargo: 'Profesor Asociado', seccion: ['C'], grado: ['2do'], notas: { Física: 19, Química: 15 } },
        { id: 4, nombre: 'Ana Torres', cedula: "321654987", asignaturas: ['Biología', "Educación Física"], email: "ana.torres@gmail.com", telefono: "321654987", estado: 'Activo', cargo: 'Profesor Titular', seccion: ['A', 'B'], grado: ['4to', '3er'], notas: { Biología: 17, Educación_Física: 12 } },
        { id: 5, nombre: 'Luis Fernández', cedula: "654987321", asignaturas: ['Lengua', "Literatura"], email: "luis.fernandez@gmail.com", telefono: "654987321", estado: 'Inactivo', cargo: 'Profesor Asistente', seccion: ['B', 'C'], grado: ['1er', '5to'], notas: { Lengua: 16, Literatura: 10 } },
        { id: 6, nombre: 'Pedro García', cedula: "789012345", asignaturas: ['Informática', "Matemáticas"], email: "pedro.garcia@gmail.com", telefono: "789012345", estado: 'Activo', cargo: 'Profesor Titular', seccion: ['A', 'C'], grado: ['3er', '4to'], notas: { Informática: 20, Matemáticas: 18 } },
        { id: 7, nombre: 'María Rodríguez', cedula: "567890123", asignaturas: ['Educación Física', "Geografía"], email: "maria.rodriguez@gmail.com", telefono: "567890123", estado: 'Inactivo', cargo: 'Profesor Asistente', seccion: ['B', 'A'], grado: ['2do', '1er'], notas: { Educación_Física: 14, Geografía: 12 } },
        { id: 8, nombre: 'Jorge Martínez', cedula: "890123456", asignaturas: ['Química', "Física"], email: "jorge.martinez@gmail.com", telefono: "890123456", estado: 'Activo', cargo: 'Profesor Asociado', seccion: ['C',], grado: ['4to'], notas: { Química: 15, Física: 19 } },
    ];


    return (
        <>
            {/* Encabezado de la página */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>Gestión de Docentes</Typography>
                <Button startIcon={<GroupAddIcon/>} variant="contained" size="large" sx={{ fontSize: '15px', py: 2, mx: 2}}
                    onClick={() => setOpenModal(true)}
                >
                    Agregar Docente
                </Button>
            </Box>

            {/* Barra de busqueda */}
            <Barradebusqueda 
                label='Buscar Docente'
                placeholder='Buscar por nombre, cédula o asignatura'
            />

            {/* Tabla de docentes */}
            <Grid container spacing={1} sx={{ p: 4, m: 4, borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
                { datosDocentes.map((docente) => (
                    <Grid key={docente.id} size={3} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '16px'}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', m: 0}}>
                                {`${docente.nombre}`}
                                </Typography>
                                <Typography variant="subtitle">
                                    <strong>V-</strong> {docente.cedula}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, backgroundColor: docente.estado === 'Activo' ? '#d4edda' : '#f8d7da', color: docente.estado === 'Activo' ? '#155724' : '#721c24', padding: '4px 8px', borderRadius: '4px'}}>
                                <Typography>
                                    {docente.estado}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography>
                                    <strong>Cargo: </strong> {docente.cargo}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <AlternateEmailIcon sx={{ mr: 1}}/>
                                <Typography>
                                    : {docente.email}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon />
                                <Typography>
                                    : {docente.telefono}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Typography>
                                    <strong>Materias: </strong> 
                                    {/* {docente.asignaturas.join(', ')} */}
                                </Typography>
                                <Grid container spacing={1} sx={{ ml: 2 }}>
                                    {docente.asignaturas.map((asignatura, index) => (
                                        <Grid key={index}>
                                            <Typography variant="body2" sx={{ backgroundColor: '#e0f7fa', padding: '2px 8px', borderRadius: '4px', marginRight: '4px' }}>
                                                {asignatura}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
                            <Button startIcon={<EditNoteIcon />} variant="outlined" size="small" sx={{ fontSize: '12px' }}>
                                Editar
                            </Button>
                            <Button onClick={() => handleOpenModal(docente)} startIcon={<VisibilityIcon />} variant="contained" size="small" sx={{ fontSize: '12px' }}>
                                Ver Detalles
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {/* Modal para agregar docente */}
            <ModalAgregarPersonal open={openModal} onClose={() => setOpenModal(false)} />
            <ModalInfoDocente open={openModalInfo} onClose={() => setOpenModalInfo(false)} docente={docenteSeleccionado}/>
        </>
    );
}

export default GestionDocentes;
