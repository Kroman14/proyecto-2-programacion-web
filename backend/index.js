const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize, Usuario, Categoria, Autor, Libro, Pedido, DetallePedido } = require('./models');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('✅ Conectado a MySQL y modelos sincronizados');
}).catch(err => {
  console.error('❌ Error conectando a la base de datos:', err);
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// RUTAS DE AUTENTICACIÓN

// Registro de usuario
app.post('/auth/register', async (req, res) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;
    
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      telefono,
      direccion
    });

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login de usuario
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email, activo: true } });
    if (!usuario) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE CATEGORÍAS

// Obtener todas las categorías
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { activo: true },
      include: [{
        model: Libro,
        as: 'libros',
        attributes: ['id'],
        where: { activo: true },
        required: false
      }]
    });
    
    const categoriasConConteo = categorias.map(cat => ({
      ...cat.toJSON(),
      total_libros: cat.libros ? cat.libros.length : 0
    }));
    
    res.json(categoriasConConteo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva categoría
app.post('/categorias', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const { nombre, descripcion, imagen } = req.body;
    const categoria = await Categoria.create({ nombre, descripcion, imagen });
    res.status(201).json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener categoría por ID
app.get('/categorias/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id, {
      where: { activo: true },
      include: [{
        model: Libro,
        as: 'libros',
        where: { activo: true },
        required: false,
        include: [{
          model: Autor,
          as: 'autor',
          attributes: ['id', 'nombre']
        }]
      }]
    });
    
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE AUTORES

// Obtener todos los autores
app.get('/autores', async (req, res) => {
  try {
    const autores = await Autor.findAll({
      where: { activo: true },
      include: [{
        model: Libro,
        as: 'libros',
        attributes: ['id'],
        where: { activo: true },
        required: false
      }]
    });
    
    const autoresConConteo = autores.map(autor => ({
      ...autor.toJSON(),
      total_libros: autor.libros ? autor.libros.length : 0
    }));
    
    res.json(autoresConConteo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo autor
app.post('/autores', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const { nombre, biografia, fecha_nacimiento, nacionalidad, foto } = req.body;
    const autor = await Autor.create({ nombre, biografia, fecha_nacimiento, nacionalidad, foto });
    res.status(201).json(autor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener autor por ID
app.get('/autores/:id', async (req, res) => {
  try {
    const autor = await Autor.findByPk(req.params.id, {
      where: { activo: true },
      include: [{
        model: Libro,
        as: 'libros',
        where: { activo: true },
        required: false,
        include: [{
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre']
        }]
      }]
    });
    
    if (!autor) {
      return res.status(404).json({ error: 'Autor no encontrado' });
    }
    
    res.json(autor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE LIBROS

// Obtener todos los libros con paginación
app.get('/libros', async (req, res) => {
  try {
    const { page = 1, limit = 12, categoria, autor, search } = req.query;
    const offset = (page - 1) * limit;
    
    let whereClause = { activo: true };
    let include = [
      {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      },
      {
        model: Autor,
        as: 'autor',
        attributes: ['id', 'nombre']
      }
    ];

    // Filtrar por categoría
    if (categoria) {
      whereClause.categoria_id = categoria;
    }

    // Filtrar por autor
    if (autor) {
      whereClause.autor_id = autor;
    }

    // Búsqueda por texto
    if (search) {
      const { Op } = require('sequelize');
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { titulo: { [Op.like]: `%${search}%` } },
          { descripcion: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows } = await Libro.findAndCountAll({
      where: whereClause,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['fecha_creacion', 'DESC']]
    });

    res.json({
      libros: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalItems: count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener libro por ID
app.get('/libros/:id', async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id, {
      where: { activo: true },
      include: [
        {
          model: Categoria,
          as: 'categoria',
          attributes: ['id', 'nombre']
        },
        {
          model: Autor,
          as: 'autor',
          attributes: ['id', 'nombre', 'biografia']
        }
      ]
    });
    
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo libro
app.post('/libros', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const libro = await Libro.create(req.body);
    const libroCompleto = await Libro.findByPk(libro.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Autor, as: 'autor', attributes: ['id', 'nombre'] }
      ]
    });
    
    res.status(201).json(libroCompleto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar libro
app.put('/libros/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const libro = await Libro.findByPk(req.params.id);
    if (!libro) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    
    await libro.update(req.body);
    const libroActualizado = await Libro.findByPk(libro.id, {
      include: [
        { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
        { model: Autor, as: 'autor', attributes: ['id', 'nombre'] }
      ]
    });
    
    res.json(libroActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RUTAS DE PEDIDOS

// Crear nuevo pedido
app.post('/pedidos', authenticateToken, async (req, res) => {
  try {
    const { items, direccion_envio, telefono_contacto, notas } = req.body;
    
    // Validar que hay items
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'El pedido debe tener al menos un item' });
    }

    // Calcular total y verificar stock
    let total = 0;
    for (const item of items) {
      const libro = await Libro.findByPk(item.libro_id);
      if (!libro) {
        return res.status(404).json({ error: `Libro con ID ${item.libro_id} no encontrado` });
      }
      if (libro.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${libro.titulo}` });
      }
      total += libro.precio * item.cantidad;
    }

    // Crear el pedido
    const pedido = await Pedido.create({
      usuario_id: req.user.id,
      total,
      direccion_envio,
      telefono_contacto,
      notas
    });

    // Crear los detalles del pedido y actualizar stock
    const detalles = [];
    for (const item of items) {
      const libro = await Libro.findByPk(item.libro_id);
      
      const detalle = await DetallePedido.create({
        pedido_id: pedido.id,
        libro_id: item.libro_id,
        cantidad: item.cantidad,
        precio_unitario: libro.precio,
        subtotal: libro.precio * item.cantidad
      });
      
      // Actualizar stock
      await libro.update({ stock: libro.stock - item.cantidad });
      
      detalles.push(detalle);
    }

    // Obtener el pedido completo
    const pedidoCompleto = await Pedido.findByPk(pedido.id, {
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['id', 'titulo', 'imagen']
          }]
        }
      ]
    });

    res.status(201).json(pedidoCompleto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener pedidos del usuario
app.get('/mis-pedidos', authenticateToken, async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { usuario_id: req.user.id },
      include: [
        {
          model: DetallePedido,
          as: 'detalles',
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['id', 'titulo', 'imagen'],
            include: [{
              model: Autor,
              as: 'autor',
              attributes: ['nombre']
            }]
          }]
        }
      ],
      order: [['fecha_pedido', 'DESC']]
    });
    
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los pedidos (solo admin)
app.get('/pedidos', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        },
        {
          model: DetallePedido,
          as: 'detalles',
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['id', 'titulo']
          }]
        }
      ],
      order: [['fecha_pedido', 'DESC']]
    });
    
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar estado del pedido (solo admin)
app.put('/pedidos/:id/estado', authenticateToken, async (req, res) => {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Solo administradores.' });
    }
    
    const { estado } = req.body;
    const pedido = await Pedido.findByPk(req.params.id);
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    await pedido.update({ estado });
    res.json({ message: 'Estado del pedido actualizado', pedido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API del Ecommerce de Libros funcionando correctamente',
    endpoints: {
      auth: '/auth/login, /auth/register',
      categorias: '/categorias',
      autores: '/autores',
      libros: '/libros',
      pedidos: '/pedidos, /mis-pedidos'
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${port}`);
  console.log(`📖 API del Ecommerce de Libros disponible en http://localhost:${port}`);
});
