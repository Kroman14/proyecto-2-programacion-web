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
    const libros = response.data.libros ? response.data.libros.slice(0, 6) : []; // Solo los primeros 6 libros
    
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
    const response = await axios.get(`${BACKEND_URL}/`);
    res.json({
      message: 'Conexión con backend exitosa',
      backend_response: response.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo conectar con el backend',
      details: error.message
    });
  }
});

// Rutas básicas que el compañero puede desarrollar
app.get('/libros', (req, res) => {
  res.json({ message: 'Aquí irá la vista de catálogo de libros' });
});

app.get('/categorias', (req, res) => {
  res.json({ message: 'Aquí irá la vista de categorías' });
});

app.get('/autores', (req, res) => {
  res.json({ message: 'Aquí irá la vista de autores' });
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
