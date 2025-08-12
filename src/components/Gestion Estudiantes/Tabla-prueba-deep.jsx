import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Button, TablePagination, Typography
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";

const datos = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com" },
  { id: 2, nombre: "María García", email: "maria@example.com" },
  { id: 3, nombre: "Carlos López", email: "carlos@example.com" },
  // ... más datos
];

export default function TablaCompleta() {
  // Estados para paginación
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);

  // Funciones de los botones
  const handleVer = (id) => alert(`Ver detalles ${id}`);
  const handleEditar = (id) => alert(`Editar registro ${id}`);
  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este registro?")) {
      alert(`Registro ${id} eliminado (aquí iría la lógica real)`);
    }
  };

  // Manejo de paginación
  const handleCambioPagina = (_, nuevaPagina) => setPagina(nuevaPagina);
  const handleCambioFilasPorPagina = (e) => {
    setFilasPorPagina(parseInt(e.target.value, 10));
    setPagina(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography variant="h6" sx={{ p: 2 }}>Lista de Usuarios</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos
              .slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina)
              .map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell>{fila.nombre}</TableCell>
                  <TableCell>{fila.email}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleVer(fila.id)} color="info">
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleEditar(fila.id)} color="primary">
                      <Edit />
                    </IconButton>
                    <Button 
                      onClick={() => handleEliminar(fila.id)} 
                      color="error"
                      startIcon={<Delete />}
                      size="small"
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={datos.length}
        rowsPerPage={filasPorPagina}
        page={pagina}
        onPageChange={handleCambioPagina}
        onRowsPerPageChange={handleCambioFilasPorPagina}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
}