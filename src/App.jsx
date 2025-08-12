import React from 'react';
import BarraLateral from './components/Barra Lateral/barra-lateral.jsx';
import { BrowserRouter, Route, Routes } from "react-router";
import Inicio from './components/Inicio';
import GestionDocentes from './components/Gestion Docentes/Gestion-docentes.jsx';
import AsistenciaDocentes from './components/Asistencia Docentes/Asistencia-docentes.jsx';
import GestionEstudiantes from './components/Gestion Estudiantes/Gestion-estudiantes.jsx';
import AsistenciaEstudiantil from './components/Asistencia Estudiantil/Asistencia-estudiantil.jsx';

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
          <Route path="asistencia-estudiantil" element={<AsistenciaEstudiantil />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
