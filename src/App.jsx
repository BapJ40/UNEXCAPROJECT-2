import React from 'react';
import BarraLateral from './components/barra-lateral';
import { BrowserRouter, Route, Routes } from "react-router";
import Inicio from './components/Inicio';
import GestionDocentes from './components/Gestion-docentes';
import AsistenciaDocentes from './components/Asistencia-docentes';
import GestionEstudiantes from './components/Gestion-estudiantes';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BarraLateral />}>
          <Route index element={<Inicio />} />
          <Route path="gestion-docentes" element={<GestionDocentes />} />
          <Route path="asistencia-docentes" element={<AsistenciaDocentes />} />
          <Route path="gestion-estudiantes" element={<GestionEstudiantes />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
