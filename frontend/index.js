const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Configuración de middleware
app.use(express.static('public'));
app.use('/images', express.static('public/images')); // Ruta específica para imágenes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: {
    // Helper para obtener la longitud de un array
    length: function(array) {
      return array ? array.length : 0;
    },
    // Helper para truncar texto
    truncate: function(text, length) {
      if (!text) return '';
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    },
    // Helper para formatear precio
    formatPrice: function(price) {
      return `$${parseFloat(price).toFixed(2)}`;
    },
    // Helper para formatear fechas
    formatDate: function(date) {
      if (!date) return 'No disponible';
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(date).toLocaleDateString('es-ES', options);
    },
    // Helper para comparar valores
    eq: function(a, b) {
      return a === b;
    },
    // Helper para mayor que
    gt: function(a, b) {
      return a > b;
    },
    // Helper para generar rango de números (para paginación)
    times: function(n, block) {
      let result = '';
      for (let i = 1; i <= n; i++) {
        result += block.fn(i);
      }
      return result;
    },
    // Helper para generar rango de números
    range: function(start, end) {
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware para hacer el BACKEND_URL disponible en todas las vistas
app.use((req, res, next) => {
  res.locals.BACKEND_URL = BACKEND_URL;
  next();
});

// Rutas básicas del frontend
app.get('/', async (req, res) => {
  try {
    // Obtener libros destacados desde el backend
    const response = await axios.get(`${BACKEND_URL}/libros`);
    
    // El backend retorna { libros: [...], totalPages, currentPage, totalItems }
    const librosData = response.data.libros || response.data;
    const libros = Array.isArray(librosData) ? librosData.slice(0, 6) : [];
    
    console.log('📚 Libros obtenidos:', libros.length);
    console.log('🖼️ Primera imagen:', libros[0]?.imagen);
    
    res.render('home', {
      title: 'Ecommerce de Libros - Inicio',
      libros: libros,
      layout: 'main'
    });
  } catch (error) {
    console.error('Error conectando con backend:', error.message);
    res.render('home', {
      title: 'Ecommerce de Libros - Inicio',
      libros: [],
      error: 'Error conectando con el backend',
      layout: 'main'
    });
  }
});

// Ruta para probar conexión con backend
app.get('/test-backend', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/libros`);
    const librosData = response.data.libros || response.data;
    
    res.json({
      message: 'Conexión con backend exitosa',
      estructura_respuesta: {
        tiene_libros: !!response.data.libros,
        es_array_directo: Array.isArray(response.data),
        estructura: Object.keys(response.data)
      },
      total_libros: Array.isArray(librosData) ? librosData.length : 0,
      primer_libro: Array.isArray(librosData) ? librosData[0] : null,
      datos_completos: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo conectar con el backend',
      details: error.message
    });
  }
});

// Rutas básicas que el compañero puede desarrollar

// Catálogo completo de libros
app.get('/libros', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // 12 libros por página
    const search = req.query.search || '';
    const categoria = req.query.categoria || '';
    
    // Construir parámetros de consulta
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    if (categoria) params.append('categoria', categoria);
    
    // Obtener libros
    const librosResponse = await axios.get(`${BACKEND_URL}/libros?${params.toString()}`);
    const librosData = librosResponse.data.libros || librosResponse.data;
    const totalPages = librosResponse.data.totalPages || 1;
    const currentPage = librosResponse.data.currentPage || 1;
    const totalItems = librosResponse.data.totalItems || 0;
    
    // Obtener categorías para el filtro
    const categoriasResponse = await axios.get(`${BACKEND_URL}/categorias`);
    const categorias = categoriasResponse.data.categorias || categoriasResponse.data || [];
    
    console.log('📚 Catálogo - Libros obtenidos:', Array.isArray(librosData) ? librosData.length : 0);
    console.log('🏷️ Categorías obtenidas:', categorias.length);
    
    res.render('catalogo', {
      title: 'Catálogo de Libros',
      libros: librosData,
      categorias: categorias,
      currentFilters: {
        search: search,
        categoria: categoria
      },
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        nextPage: currentPage + 1,
        prevPage: currentPage - 1
      },
      layout: 'main'
    });
  } catch (error) {
    console.error('Error obteniendo catálogo:', error.message);
    res.render('catalogo', {
      title: 'Catálogo de Libros',
      libros: [],
      categorias: [],
      currentFilters: {},
      error: 'Error cargando el catálogo',
      layout: 'main'
    });
  }
});

// Detalle de un libro específico
app.get('/libro/:id', async (req, res) => {
  try {
    const libroId = req.params.id;
    const response = await axios.get(`${BACKEND_URL}/libros/${libroId}`);
    const libro = response.data;
    
    console.log('📖 Detalle del libro:', libro.titulo);
    
    res.render('detalle-libro', {
      title: `${libro.titulo} - Detalle`,
      libro: libro,
      layout: 'main'
    });
  } catch (error) {
    console.error('Error obteniendo detalle del libro:', error.message);
    res.render('error', {
      title: 'Libro no encontrado',
      message: 'El libro que buscas no existe o no está disponible',
      layout: 'main'
    });
  }
});

app.get('/libros_old', (req, res) => {
  res.json({ message: 'Aquí irá la vista de catálogo de libros' });
});

app.get('/categorias', (req, res) => {
  res.json({ message: 'Aquí irá la vista de categorías' });
});

// Catálogo de autores
app.get('/autores', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // 12 autores por página
    const search = req.query.search || '';
    
    // Construir parámetros de consulta
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', limit);
    if (search) params.append('search', search);
    
    const response = await axios.get(`${BACKEND_URL}/autores?${params.toString()}`);
    const autoresData = response.data.autores || response.data;
    const totalPages = response.data.totalPages || 1;
    const currentPage = response.data.currentPage || 1;
    const totalItems = response.data.totalItems || 0;
    
    console.log('👥 Autores obtenidos:', Array.isArray(autoresData) ? autoresData.length : 0);
    
    res.render('autores', {
      title: 'Catálogo de Autores',
      autores: autoresData,
      currentFilters: {
        search: search
      },
      pagination: {
        currentPage,
        totalPages,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        nextPage: currentPage + 1,
        prevPage: currentPage - 1
      },
      layout: 'main'
    });
  } catch (error) {
    console.error('Error obteniendo autores:', error.message);
    res.render('autores', {
      title: 'Catálogo de Autores',
      autores: [],
      currentFilters: {},
      error: 'Error cargando los autores',
      layout: 'main'
    });
  }
});

app.get('/carrito', (req, res) => {
  res.json({ message: 'Aquí irá la vista del carrito de compras' });
});

app.get('/admin', (req, res) => {
  res.json({ message: 'Aquí irá el panel de administración' });
});

// Ruta para servir imágenes por defecto
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = `public/images/${filename}`;
  
  // Si la imagen no existe, servir una imagen por defecto
  if (!require('fs').existsSync(imagePath)) {
    return res.redirect('/images/default-book.jpg');
  }
  
  res.sendFile(require('path').resolve(imagePath));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Página no encontrada',
    message: 'Esta ruta aún no ha sido implementada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Frontend corriendo en http://localhost:${PORT}`);
  console.log(`🔗 Conectando con backend en ${BACKEND_URL}`);
  console.log('📝 Estructura básica lista para desarrollo');
});
