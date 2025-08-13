const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Configuración de middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas (para que el compañero use handlebars o EJS)
app.set('view engine', 'html');
app.set('views', './views');

// Middleware para hacer el BACKEND_URL disponible en todas las vistas
app.use((req, res, next) => {
  res.locals.BACKEND_URL = BACKEND_URL;
  next();
});

// Rutas básicas del frontend
app.get('/', async (req, res) => {
  try {
    // Obtener libros desde el backend
    const response = await axios.get(`${BACKEND_URL}/api/libros`);
    res.json({
      message: 'Frontend funcionando - Aquí irá la vista principal',
      libros: response.data,
      nota: 'Los datos vienen del backend correctamente'
    });
  } catch (error) {
    console.error('Error conectando con backend:', error.message);
    res.status(500).json({
      error: 'Error conectando con el backend',
      message: error.message,
      nota: 'Asegúrate de que el backend esté corriendo en el puerto 3001'
    });
  }
});

// Ruta para probar conexión con backend
app.get('/test-backend', async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/test`);
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
