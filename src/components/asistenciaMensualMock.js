// SIMULACIÓN DE DATOS DE ASISTENCIA DIARIA
// En una app real, esto sería el resultado de una consulta a la base de datos
export const asistenciaMensualMock = {
  // --- 1er Año ---
  // Juan Pérez (V-28123456)
  "V-28123456": {
    "2025-08-01": { status: 'P', observacion: 'Participó activamente en clase.' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'T', observacion: 'Llegó 10 minutos tarde.' },
  },
  // Ana Rodríguez (V-28234567)
  "V-28234567": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'J', observacion: 'Cita médica, justificativo entregado.' },
    "2025-08-06": { status: 'A', observacion: 'Inasistencia no justificada.' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Luis Martínez (V-28345678)
  "V-28345678": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'A', observacion: 'Inasistencia no justificada.' },
    "2025-08-05": { status: 'A', observacion: 'Inasistencia no justificada.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Sofía García (V-28456789)
  "V-28456789": {
    "2025-08-01": { status: 'P', observacion: 'Excelente participación.' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Diego López (V-28567890)
  "V-28567890": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'T', observacion: 'Llegó 5 minutos tarde.' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Valentina Sánchez (V-27123456)
  "V-27123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Carlos Díaz (V-27234567)
  "V-27234567": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'J', observacion: 'Reposo médico.' },
    "2025-08-05": { status: 'J', observacion: 'Reposo médico.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // ... (y así sucesivamente para los 75 estudiantes)

  // --- 2do Año ---
  // Valeria Peña (V-25123456)
  "V-25123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: 'Colaboradora en clase.' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Adrián Mendoza (V-25234567)
  "V-25234567": {
    "2025-08-01": { status: 'A', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'T', observacion: 'Llegó 20 minutos tarde.' },
  },
   // ... y así sucesivamente para todos los estudiantes...

  // --- 3er Año ---
  // Alejandro Bravo (V-22123456)
  "V-22123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Fernanda Luna (V-22234567)
  "V-22234567": {
    "2025-08-01": { status: 'T', observacion: 'Retraso por tráfico.' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'A', observacion: 'Sin notificar.' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // ... y así sucesivamente para todos los estudiantes...

  // --- 4to Año ---
  // Liliana Urbina (V-19123456)
  "V-19123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: 'Ayudó a un compañero.' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Maximiliano Meza (V-19234567)
  "V-19234567": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'J', observacion: 'Asunto familiar justificado.' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // ... y así sucesivamente para todos los estudiantes...

  // --- 5to Año ---
  // Elias Velasquez (V-16123456)
  "V-16123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'T', observacion: 'Llegó 5 minutos tarde.' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Alba Cardenas (V-16234567)
  "V-16234567": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Mario Guillen (V-16345678)
  "V-16345678": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'A', observacion: '' },
    "2025-08-05": { status: 'J', observacion: 'Justificativo en proceso.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Último estudiante de la lista para completar
  // Alex arias (V-14567890)
  "V-14567890": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'T', observacion: 'Llegó 15 minutos tarde.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'A', observacion: 'Inasistencia no justificada.' },
  },

  // --- Docentes ---
  // Profesor de Matemáticas (V-890123456)
  "V-890123456": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'T', observacion: 'Llegó 10 minutos tarde.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Profesor de Lengua y Literatura (V-12345678)
  "V-12345678": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'P', observacion: '' },
    "2025-08-05": { status: 'P', observacion: '' },
    "2025-08-06": { status: 'T', observacion: 'Llegó 5 minutos tarde.' },
    "2025-08-07": { status: 'P', observacion: '' },
  },
  // Profesor de Física (V-987654321)
  "V-987654321": {
    "2025-08-01": { status: 'P', observacion: '' },
    "2025-08-04": { status: 'A', observacion: '' },
    "2025-08-05": { status: 'J', observacion: 'Justificativo en proceso.' },
    "2025-08-06": { status: 'P', observacion: '' },
    "2025-08-07": { status: 'P', observacion: '' },
  }
};