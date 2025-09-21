import React from 'react';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericTable from '../../Componente generico/TablaBase';
import ModalGenerico from '../../Componente generico/ModalGenerico';
import InputsModales from '../Modales/InputsModales';
import ModalVerPersona from '../Modales/ModalVerPersona';

const TablaEstudiantes = ( { estudiantes } ) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false); // <-- CAMBIO: Usamos un booleano para el modo

  const handleAction = (action, estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setIsEditMode(action === 'edit'); 
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Buena práctica: limpiar el estudiante seleccionado al cerrar para evitar datos viejos
    setEstudianteSeleccionado(null); 
  };

  const tituloModal = isEditMode 
    ? "Editar Información del Estudiante" 
    : "Información del Estudiante";

  const columns = [
    { field: 'cedula', headerName: 'Cédula' },
    { field: 'nombreCompleto', headerName: 'Nombre Completo', align: 'left',
      component: ({ rowData }) => `${rowData.nombre} ${rowData.apellidos}`
     },
    { field: 'año', headerName: 'Año/Sección', align: 'left',
      component: ({ rowData }) => `${rowData.año} - "${rowData.seccion}"`
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
      {/* Usamos el ModalGenerico como contenedor principal */}
      <ModalGenerico
        open={modalOpen}
        onClose={handleCloseModal}
        titulo={tituloModal}
        sx={{ width: { md: 850 } }} // Podemos definir el ancho aquí
      >
        {/* --- AQUÍ ESTÁ LA MAGIA: RENDERIZADO CONDICIONAL --- */}
        {isEditMode ? (
          // Si estamos en modo edición, mostramos el formulario
          <InputsModales datosAeditar={estudianteSeleccionado} />
        ) : (
          // Si no, mostramos la ficha de visualización
          <ModalVerPersona data={estudianteSeleccionado} />
        )}
      </ModalGenerico>

      <GenericTable
        data={estudiantes} // --- PASO 2: Usamos los datos importados ---
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