import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Box from '@mui/material/Box';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import OutlinedInput from '@mui/material/OutlinedInput';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TablaEstudiantes from './Tabla-estudiantes';
import Barradebusqueda from '../Componente generico/Barra-de-busqueda';
import ModalAgregarEstudiante from './ModalAgregarEstudiante';

const GestionEstudiantes = () => {
  const [age, setAge] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const [estudiante, setEstudiante] = React.useState("");

  const handleEstudianteChange = (event) => {
    setEstudiante(event.target.value);
  };
  
    return (
      <>
        {/* Encabezado de la página */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
          <Typography variant="h4" sx={{ margin: 0, fontWeight: 'bold' }}>
            Gestión de Estudiantes
          </Typography>
          <Box>
            <Button startIcon={<FileUploadIcon/>} variant="outlined" size="large" sx={{ fontSize: '15px', py: 1, mx: 2}}>
              Importar
            </Button>
            <Button onClick={() => setModalOpen(true)} startIcon={<GroupAddIcon/>} variant="contained" size="large" sx={{ fontSize: '15px', py: 1, mx: 2}}>
              Agregar Nuevo Estudiante
            </Button>
          </Box>
        </Box>

        {/* Barra de busqueda y Opciones del filtro  */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Barradebusqueda 
              label='Buscar Estudiante'
              placeholder='Buscar por nombre, apellido o ID'
              icon={<SearchIcon />}
              sx={{ width: '100%' }}
            />
          </Box>

          {/* Filtros para los estudiantes */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
            <Select
              displayEmpty
              value={estudiante}
              onChange={handleEstudianteChange}
              input={<OutlinedInput />}
              renderValue={
                estudiante !== "" ? undefined : () => (
                  "Todos los Años"
                )
              }
            >
              <MenuItem value={1}>Todos los Años</MenuItem>
              <MenuItem value={2}>1er Año</MenuItem>
              <MenuItem value={3}>2do Año</MenuItem>
              <MenuItem value={4}>3er Año</MenuItem>
              <MenuItem value={5}>4to Año</MenuItem>
              <MenuItem value={6}>5to Año</MenuItem>
            </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
            <Select
              displayEmpty
              value={age}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={
              age !== "" ? undefined : () => (
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <FilterAltIcon sx={{ mr: 1 }} />
                Filtros
                </Box>
              )
              }
            >
              <MenuItem value="" disabled>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterAltIcon sx={{ mr: 1 }} />
                Filtros
              </Box>
              </MenuItem>
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={2}>Inactivo</MenuItem>
              <MenuItem value={3}>Promedio</MenuItem>
            </Select>
            </FormControl>

            <Button variant='outlined' size="medium" startIcon={<FileDownloadIcon />} sx={{ fontSize: '15px', py: 1 }}>
            Exportar
            </Button>
          </Box>
        </Box>

        {/* Tabla de estudiantes */}
        <Box sx={{ p: 4, m: 4, borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Lista de Estudiantes
          </Typography>
          <TablaEstudiantes />
        </Box>

        {/* Modal para agregar estudiante */}
        <ModalAgregarEstudiante open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
}

export default GestionEstudiantes;
