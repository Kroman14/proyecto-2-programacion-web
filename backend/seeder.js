const bcrypt = require('bcryptjs');
const { sequelize, Usuario, Categoria, Autor, Libro, Pedido, DetallePedido } = require('./models');

async function seed() {
  try {
    // Sincronizar la base de datos (esto creará las tablas)
    await sequelize.sync({ force: true });
    console.log('✅ Tablas creadas/recreadas');

    // Crear usuarios
    const adminPassword = await bcrypt.hash('admin123', 10);
    const clientePassword = await bcrypt.hash('cliente123', 10);

    const usuarios = await Usuario.bulkCreate([
      {
        nombre: 'Administrador',
        email: 'admin@ecommerce.com',
        password: adminPassword,
        telefono: '555-0001',
        direccion: 'Calle Admin 123',
        rol: 'admin'
      },
      {
        nombre: 'Juan Pérez',
        email: 'juan@email.com',
        password: clientePassword,
        telefono: '555-0002',
        direccion: 'Av. Principal 456'
      },
      {
        nombre: 'María García',
        email: 'maria@email.com',
        password: clientePassword,
        telefono: '555-0003',
        direccion: 'Calle Secundaria 789'
      }
    ]);
    console.log('✅ Usuarios creados');

    // Crear categorías
    const categorias = await Categoria.bulkCreate([
      {
        nombre: 'Ficción',
        descripcion: 'Novelas y cuentos de ficción',
        imagen: 'https://via.placeholder.com/300x200?text=Ficción'
      },
      {
        nombre: 'Ciencia Ficción',
        descripcion: 'Libros de ciencia ficción y fantasía',
        imagen: 'https://via.placeholder.com/300x200?text=Ciencia+Ficción'
      },
      {
        nombre: 'Romance',
        descripcion: 'Novelas románticas',
        imagen: 'https://via.placeholder.com/300x200?text=Romance'
      },
      {
        nombre: 'Misterio',
        descripcion: 'Novelas de misterio y suspenso',
        imagen: 'https://via.placeholder.com/300x200?text=Misterio'
      },
      {
        nombre: 'Biografías',
        descripcion: 'Biografías y autobiografías',
        imagen: 'https://via.placeholder.com/300x200?text=Biografías'
      },
      {
        nombre: 'Técnicos',
        descripcion: 'Libros técnicos y educativos',
        imagen: 'https://via.placeholder.com/300x200?text=Técnicos'
      }
    ]);
    console.log('✅ Categorías creadas');

    // Crear autores
    const autores = await Autor.bulkCreate([
      {
        nombre: 'Gabriel García Márquez',
        biografia: 'Escritor colombiano, premio Nobel de Literatura 1982',
        fecha_nacimiento: '1927-03-06',
        nacionalidad: 'Colombiana',
        foto: 'https://via.placeholder.com/200x250?text=García+Márquez'
      },
      {
        nombre: 'Isabel Allende',
        biografia: 'Escritora chilena, una de las novelistas más leídas del mundo',
        fecha_nacimiento: '1942-08-02',
        nacionalidad: 'Chilena',
        foto: 'https://via.placeholder.com/200x250?text=Isabel+Allende'
      },
      {
        nombre: 'Mario Vargas Llosa',
        biografia: 'Escritor peruano, premio Nobel de Literatura 2010',
        fecha_nacimiento: '1936-03-28',
        nacionalidad: 'Peruana',
        foto: 'https://via.placeholder.com/200x250?text=Vargas+Llosa'
      },
      {
        nombre: 'Julio Cortázar',
        biografia: 'Escritor argentino, maestro del cuento fantástico',
        fecha_nacimiento: '1914-08-26',
        nacionalidad: 'Argentina',
        foto: 'https://via.placeholder.com/200x250?text=Cortázar'
      },
      {
        nombre: 'Octavio Paz',
        biografia: 'Poeta y ensayista mexicano, premio Nobel de Literatura 1990',
        fecha_nacimiento: '1914-03-31',
        nacionalidad: 'Mexicana',
        foto: 'https://via.placeholder.com/200x250?text=Octavio+Paz'
      },
      {
        nombre: 'Stephen King',
        biografia: 'Escritor estadounidense, maestro del terror',
        fecha_nacimiento: '1947-09-21',
        nacionalidad: 'Estadounidense',
        foto: 'https://via.placeholder.com/200x250?text=Stephen+King'
      }
    ]);
    console.log('✅ Autores creados');

    // Crear libros
    const libros = await Libro.bulkCreate([
      {
        titulo: 'Cien años de soledad',
        descripcion: 'Una obra maestra del realismo mágico que narra la historia de la familia Buendía',
        isbn: '978-0307389732',
        precio: 25.99,
        stock: 50,
        paginas: 417,
        fecha_publicacion: '1967-06-05',
        editorial: 'Sudamericana',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=Cien+años+de+soledad',
        categoria_id: 1, // Ficción
        autor_id: 1 // García Márquez
      },
      {
        titulo: 'La casa de los espíritus',
        descripcion: 'La saga de una familia marcada por el amor, la muerte y la política',
        isbn: '978-8401341700',
        precio: 22.50,
        stock: 35,
        paginas: 512,
        fecha_publicacion: '1982-01-01',
        editorial: 'Plaza & Janés',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=La+casa+de+los+espíritus',
        categoria_id: 1, // Ficción
        autor_id: 2 // Isabel Allende
      },
      {
        titulo: 'Conversación en La Catedral',
        descripcion: 'Una novela que retrata el Perú durante la dictadura de Odría',
        isbn: '978-8420428093',
        precio: 28.99,
        stock: 25,
        paginas: 729,
        fecha_publicacion: '1969-01-01',
        editorial: 'Alfaguara',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=Conversación+en+La+Catedral',
        categoria_id: 1, // Ficción
        autor_id: 3 // Vargas Llosa
      },
      {
        titulo: 'Rayuela',
        descripcion: 'Una novela experimental que puede leerse de múltiples formas',
        isbn: '978-8437604572',
        precio: 24.75,
        stock: 30,
        paginas: 736,
        fecha_publicacion: '1963-06-28',
        editorial: 'Cátedra',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=Rayuela',
        categoria_id: 1, // Ficción
        autor_id: 4 // Cortázar
      },
      {
        titulo: 'El laberinto de la soledad',
        descripcion: 'Ensayo sobre la identidad y psicología del mexicano',
        isbn: '978-9681668167',
        precio: 19.99,
        stock: 40,
        paginas: 191,
        fecha_publicacion: '1950-01-01',
        editorial: 'Fondo de Cultura Económica',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=El+laberinto+de+la+soledad',
        categoria_id: 5, // Biografías
        autor_id: 5 // Octavio Paz
      },
      {
        titulo: 'IT (ESO)',
        descripcion: 'Una aterradora historia sobre un grupo de niños que enfrentan sus miedos',
        isbn: '978-1501142970',
        precio: 32.99,
        stock: 45,
        paginas: 1138,
        fecha_publicacion: '1986-09-15',
        editorial: 'Scribner',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=IT',
        categoria_id: 4, // Misterio
        autor_id: 6 // Stephen King
      },
      {
        titulo: 'Eva Luna',
        descripcion: 'La historia de una mujer que encuentra en la narración su forma de libertad',
        isbn: '978-8401341717',
        precio: 21.99,
        stock: 38,
        paginas: 303,
        fecha_publicacion: '1987-01-01',
        editorial: 'Plaza & Janés',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=Eva+Luna',
        categoria_id: 3, // Romance
        autor_id: 2 // Isabel Allende
      },
      {
        titulo: 'El resplandor',
        descripcion: 'Una familia aislada en un hotel embrujado durante el invierno',
        isbn: '978-0307743657',
        precio: 29.99,
        stock: 42,
        paginas: 447,
        fecha_publicacion: '1977-01-28',
        editorial: 'Doubleday',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=El+resplandor',
        categoria_id: 4, // Misterio
        autor_id: 6 // Stephen King
      },
      {
        titulo: 'Bestiario',
        descripcion: 'Colección de cuentos fantásticos que marcaron el género',
        isbn: '978-8437600109',
        precio: 18.50,
        stock: 33,
        paginas: 159,
        fecha_publicacion: '1951-01-01',
        editorial: 'Sudamericana',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=Bestiario',
        categoria_id: 2, // Ciencia Ficción
        autor_id: 4 // Cortázar
      },
      {
        titulo: 'El amor en los tiempos del cólera',
        descripcion: 'Una historia de amor que perdura más de cincuenta años',
        isbn: '978-0307389725',
        precio: 26.99,
        stock: 55,
        paginas: 348,
        fecha_publicacion: '1985-01-01',
        editorial: 'Oveja Negra',
        idioma: 'Español',
        imagen: 'https://via.placeholder.com/300x450?text=El+amor+en+los+tiempos+del+cólera',
        categoria_id: 3, // Romance
        autor_id: 1 // García Márquez
      }
    ]);
    console.log('✅ Libros creados');

    // Crear algunos pedidos de ejemplo
    const pedidos = await Pedido.bulkCreate([
      {
        usuario_id: 2, // Juan Pérez
        total: 51.98,
        estado: 'entregado',
        direccion_envio: 'Av. Principal 456',
        telefono_contacto: '555-0002',
        notas: 'Entregar en horario de oficina'
      },
      {
        usuario_id: 3, // María García
        total: 24.75,
        estado: 'enviado',
        direccion_envio: 'Calle Secundaria 789',
        telefono_contacto: '555-0003'
      }
    ]);
    console.log('✅ Pedidos creados');

    // Crear detalles de pedidos
    await DetallePedido.bulkCreate([
      {
        pedido_id: 1,
        libro_id: 1, // Cien años de soledad
        cantidad: 1,
        precio_unitario: 25.99,
        subtotal: 25.99
      },
      {
        pedido_id: 1,
        libro_id: 2, // La casa de los espíritus
        cantidad: 1,
        precio_unitario: 22.50,
        subtotal: 22.50
      },
      {
        pedido_id: 1,
        libro_id: 9, // Bestiario
        cantidad: 2,
        precio_unitario: 18.50,
        subtotal: 37.00
      },
      {
        pedido_id: 2,
        libro_id: 4, // Rayuela
        cantidad: 1,
        precio_unitario: 24.75,
        subtotal: 24.75
      }
    ]);
    console.log('✅ Detalles de pedidos creados');

    console.log('\n🎉 ¡Seeder ejecutado exitosamente!');
    console.log('\n📊 Datos creados:');
    console.log(`   - ${usuarios.length} usuarios (admin@ecommerce.com / admin123, juan@email.com / cliente123)`);
    console.log(`   - ${categorias.length} categorías`);
    console.log(`   - ${autores.length} autores`);
    console.log(`   - ${libros.length} libros`);
    console.log(`   - ${pedidos.length} pedidos con sus detalles`);
    console.log('\n🚀 Ya puedes ejecutar: npm start');

    await sequelize.close();
  } catch (err) {
    console.error('❌ Error en seeder:', err);
    await sequelize.close();
    process.exit(1);
  }
}

seed();
