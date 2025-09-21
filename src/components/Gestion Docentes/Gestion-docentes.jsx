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
import ModalAgregarPersonal from './Modales/ModalAgregarPersonal';
import ModalInfoDocente from './Modales/ModalInfoDocente';
import datosDocentesInciales from '../Docentes';
import ModalGenerico from '../Componente generico/ModalGenerico';
import InputsModalDocente from './Modales/InputsModalDocente';

const GestionDocentes = () => {
    const [docentes, setDocentes] = React.useState(datosDocentesInciales);
    const [busqueda, setBusqueda] = React.useState('');


    // Estados para controlar los modales
    const [modalAgregarEditarOpen, setModalAgregarEditarOpen] = React.useState(false);
    const [modalInfoOpen, setModalInfoOpen] = React.useState(false);
    const [docenteSeleccionado, setDocenteSeleccionado] = React.useState(null);

     // --- 2. LÓGICA DE FILTRADO ---
    const docentesFiltrados = React.useMemo(() => {
        if (!busqueda) return docentes;
        const busquedaLower = busqueda.toLowerCase();
        return docentes.filter(docente =>
            docente.nombre.toLowerCase().includes(busquedaLower) ||
            docente.cedula.includes(busquedaLower) ||
            docente.asignaturas.some(asig => asig.toLowerCase().includes(busquedaLower))
        );
    }, [docentes, busqueda]);

    // --- 3. MANEJADORES DE EVENTOS PARA LOS MODALES ---
    const handleAbrirModalVer = (docente) => {
        setDocenteSeleccionado(docente);
        setModalInfoOpen(true);
    };

    const handleAbrirModalCrear = () => {
        setDocenteSeleccionado(null); // Nos aseguramos de que no haya un docente seleccionado
        setModalAgregarEditarOpen(true);
    };

    const handleAbrirModalEditar = (docente) => {
        setDocenteSeleccionado(docente); // Guardamos el docente para pasarlo al formulario
        setModalAgregarEditarOpen(true);
    };
    
    const handleCerrarModales = () => {
        setModalAgregarEditarOpen(false);
        setModalInfoOpen(false);
        setDocenteSeleccionado(null); // Limpiamos al cerrar cualquier modal
    };

     // Función para manejar el guardado (crear o actualizar)
    const handleGuardarDocente = (datosFormulario) => {
        if (docenteSeleccionado) {
            // Lógica para ACTUALIZAR
            console.log("Actualizando docente:", datosFormulario);
            setDocentes(docentes.map(d => d.id === datosFormulario.id ? datosFormulario : d));
        } else {
            // Lógica para CREAR
            console.log("Creando nuevo docente:", datosFormulario);
            const nuevoDocente = { ...datosFormulario, id: Date.now() }; // Añadimos un ID temporal
            setDocentes([...docentes, nuevoDocente]);
        }
        handleCerrarModales();
    };

    return (
        <>
            {/* Encabezado de la página */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>Gestión de Docentes</Typography>
                <Button startIcon={<GroupAddIcon/>} variant="contained" size="large" sx={{ fontSize: '15px', py: 2, mx: 2}}
                    onClick={handleAbrirModalCrear}
                >
                    Agregar Docente
                </Button>
            </Box>

            {/* Barra de búsqueda */}
            <Barradebusqueda 
                label='Buscar Docente'
                placeholder='Buscar por nombre, cédula o asignatura'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* Tabla de docentes */}
            <Grid container spacing={1} sx={{ p: 4, m: 4, borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
                { docentesFiltrados.map((docente) => (
                    <Grid key={docente.id} size={3} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
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
                            <Button startIcon={<EditNoteIcon />} variant="outlined" size="small" sx={{ fontSize: '12px' } } onClick={() => handleAbrirModalEditar(docente)}>
                                Editar
                            </Button>
                            <Button onClick={() => handleAbrirModalVer(docente)} startIcon={<VisibilityIcon />} variant="contained" size="small" sx={{ fontSize: '12px' }}>
                                Ver Detalles
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>


             {/* --- 6. MODAL GENÉRICO PARA AGREGAR/EDITAR --- */}
            <ModalGenerico
                open={modalAgregarEditarOpen}
                onClose={handleCerrarModales}
                titulo={docenteSeleccionado ? "Editar Docente" : "Agregar Nuevo Docente"}
            >
                <InputsModalDocente
                    dataAEditar={docenteSeleccionado} 
                    onSubmit={handleGuardarDocente}
                />
            </ModalGenerico>

            {/* Modal de Información (si es un componente separado) */}
            <ModalInfoDocente open={modalInfoOpen} onClose={handleCerrarModales} docente={docenteSeleccionado}/>
        </>
    );
}

export default GestionDocentes;
