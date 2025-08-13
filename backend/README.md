# Ecommerce de Libros - Backend

Backend para un sistema de ecommerce de libros desarrollado con Node.js, Express y Sequelize.

## 🚀 Características

- **API REST completa** para gestión de ecommerce
- **Autenticación JWT** con roles (cliente/admin)
- **6 tablas principales**: usuarios, categorías, autores, libros, pedidos, detalle_pedidos
- **Relaciones entre modelos** usando Sequelize ORM
- **Validación de stock** en tiempo real
- **Gestión de pedidos** completa
- **Búsqueda y filtrado** de libros
- **Panel administrativo** para gestión de inventario

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL Server
- npm o yarn

## 🛠️ Instalación

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**
   ```bash
   cd backend
   npm install
   ```

3. **Configurar variables de entorno**
   
   Edita el archivo `.env` con tus credenciales de MySQL:
   ```env
   DB_NAME=ecommerce_libros
   DB_USER=root
   DB_PASSWORD=tu_password_mysql
   DB_HOST=127.0.0.1
   JWT_SECRET=tu_clave_secreta
   ```

4. **Crear base de datos y datos de prueba**
   ```bash
   npm run seed
   ```

5. **Ejecutar el servidor**
   ```bash
   npm start
   # o para desarrollo con nodemon:
   npm run dev
   ```

El servidor estará disponible en: `http://localhost:3001`

## 📊 Estructura de la Base de Datos

### Tablas Principales:

1. **usuarios** - Información de clientes y administradores
2. **categorias** - Categorías de libros (Ficción, Romance, etc.)
3. **autores** - Información de autores
4. **libros** - Catálogo de libros con precios y stock
5. **pedidos** - Órdenes de compra
6. **detalle_pedidos** - Items específicos de cada pedido

### Relaciones:
- Libros → Categorías (muchos a uno)
- Libros → Autores (muchos a uno)
- Pedidos → Usuarios (muchos a uno)
- DetallePedidos → Pedidos (muchos a uno)
- DetallePedidos → Libros (muchos a uno)

## 🔐 Autenticación

### Usuarios de Prueba:

**Administrador:**
- Email: `admin@ecommerce.com`
- Password: `admin123`

**Cliente:**
- Email: `juan@email.com`
- Password: `cliente123`

### Endpoints de Autenticación:

- `POST /auth/register` - Registro de nuevo usuario
- `POST /auth/login` - Inicio de sesión

## 📡 API Endpoints

### Públicos:
- `GET /` - Información de la API
- `GET /categorias` - Lista de categorías
- `GET /autores` - Lista de autores
- `GET /libros` - Lista de libros (con paginación y filtros)
- `GET /libros/:id` - Detalle de un libro

### Autenticados (requieren token):
- `GET /mis-pedidos` - Pedidos del usuario logueado
- `POST /pedidos` - Crear nuevo pedido

### Solo Administradores:
- `POST /categorias` - Crear categoría
- `POST /autores` - Crear autor
- `POST /libros` - Crear libro
- `PUT /libros/:id` - Actualizar libro
- `GET /pedidos` - Ver todos los pedidos
- `PUT /pedidos/:id/estado` - Actualizar estado de pedido

## 🔍 Ejemplos de Uso

### Búsqueda de libros:
```
GET /libros?search=garcia&categoria=1&page=1&limit=10
```

### Crear pedido:
```json
POST /pedidos
{
  "items": [
    {
      "libro_id": 1,
      "cantidad": 2
    }
  ],
  "direccion_envio": "Mi dirección",
  "telefono_contacto": "555-1234"
}
```

## 🗂️ Estructura de Archivos

```
backend/
├── index.js          # Servidor principal con todas las rutas
├── models.js         # Modelos de Sequelize y relaciones
├── seeder.js         # Script para crear datos de prueba
├── package.json      # Dependencias del proyecto
├── .env             # Variables de entorno
└── README.md        # Este archivo
```

## 🚀 Próximos Pasos

1. Conectar con el frontend (puerto 3000)
2. Implementar subida de imágenes
3. Agregar sistema de cupones/descuentos
4. Implementar notificaciones por email
5. Agregar reportes de ventas

## 📈 Scripts Disponibles

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar en desarrollo (con nodemon)
- `npm run seed` - Crear/recrear base de datos con datos de prueba

## 🔧 Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Manejo de peticiones cross-origin
