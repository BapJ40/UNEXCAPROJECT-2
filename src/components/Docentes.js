//Esto se usa en asistencia docentes es de ejemplo para cuando aplique la base de datos


const datosDocentes = [
    {
        id: 1,
        nombre: 'Juan Pérez',
        cedula: '123456789',
        asignaturas: ['Matemáticas', 'Ingles'],
        email: 'ejemplo@gmail.com',
        telefono: '123456789',
        estado: 'Activo',
        cargo: 'Profesor Titular',
        seccion: ['B'],
        grado: ['4to'],
        notas: { Matemáticas: 18, Ingles: 14 }
    },
    {
        id: 2,
        nombre: 'María Gómez',
        cedula: '987654321',
        asignaturas: ['Historia', 'Geografía'],
        email: 'maria.gomez@gmail.com',
        telefono: '987654321',
        estado: 'Inactivo',
        cargo: 'Profesor Asistente',
        seccion: ['B', 'C'],
        grado: ['3er', '2do'],
        notas: { Historia: 13, Geografía: 11 }
    },
    {
        id: 3,
        nombre: 'Carlos Ruiz',
        cedula: '456123789',
        asignaturas: ['Física', 'Química'],
        email: 'carlos.ruiz@gmail.com',
        telefono: '456123789',
        estado: 'Activo',
        cargo: 'Profesor Asociado',
        seccion: ['C'],
        grado: ['2do'],
        notas: { Física: 19, Química: 15 }
    },
    {
        id: 4,
        nombre: 'Ana Torres',
        cedula: '321654987',
        asignaturas: ['Biología', 'Educación Física'],
        email: 'ana.torres@gmail.com',
        telefono: '321654987',
        estado: 'Activo',
        cargo: 'Profesor Titular',
        seccion: ['A', 'B'],
        grado: ['4to', '3er'],
        notas: { Biología: 17, Educación_Física: 12 }
    },
    {
        id: 5,
        nombre: 'Luis Fernández',
        cedula: '654987321',
        asignaturas: ['Lengua', 'Literatura'],
        email: 'luis.fernandez@gmail.com',
        telefono: '654987321',
        estado: 'Inactivo',
        cargo: 'Profesor Asistente',
        seccion: ['B', 'C'],
        grado: ['1er', '5to'],
        notas: { Lengua: 16, Literatura: 10 }
    },
    {
        id: 6,
        nombre: 'Pedro García',
        cedula: '789012345',
        asignaturas: ['Informática', 'Matemáticas'],
        email: 'pedro.garcia@gmail.com',
        telefono: '789012345',
        estado: 'Activo',
        cargo: 'Profesor Titular',
        seccion: ['A', 'C'],
        grado: ['3er', '4to'],
        notas: { Informática: 20, Matemáticas: 18 }
    },
    {
        id: 7,
        nombre: 'María Rodríguez',
        cedula: '567890123',
        asignaturas: ['Educación Física', 'Geografía'],
        email: 'maria.rodriguez@gmail.com',
        telefono: '567890123',
        estado: 'Inactivo',
        cargo: 'Profesor Asistente',
        seccion: ['B', 'A'],
        grado: ['2do', '1er'],
        notas: { Educación_Física: 14, Geografía: 12 }
    },
    {
        id: 8,
        nombre: 'Jorge Martínez',
        cedula: '890123456',
        asignaturas: ['Química', 'Física'],
        email: 'jorge.martinez@gmail.com',
        telefono: '890123456',
        estado: 'Activo',
        cargo: 'Profesor Asociado',
        seccion: ['C'],
        grado: ['4to'],
        notas: { Química: 15, Física: 19 }
    }
];

export default datosDocentes;
