# Frontend - Ecommerce de Libros

## Estructura Básica Creada

Este es el frontend básico para el ecommerce de libros. La estructura está lista para que puedas desarrollar las vistas con Bootstrap.

### Estructura de Carpetas

```
frontend/
├── index.js          # Servidor principal
├── package.json      # Dependencias
├── .env             # Variables de entorno
├── views/           # Plantillas (aquí van tus vistas)
├── public/          # Archivos estáticos
│   ├── css/        # Estilos CSS
│   └── js/         # JavaScript del frontend
└── README.md       # Este archivo
```

### Instalación

```bash
cd frontend
npm install
```

### Ejecución

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El frontend correrá en: http://localhost:3000

### Rutas Implementadas

- `GET /` - Inicio
- `GET /libros` - Catálogo de libros (con filtros y paginación)
- `GET /libro/:id` - Detalle de libro
- `GET /autores` - Catálogo de autores (con búsqueda y paginación)
- `GET /autor/:id` - Detalle de autor
- `GET /login` - Formulario de inicio de sesión
- `POST /login` - Autenticación (guardar token en cookie)
- `GET /logout` - Cerrar sesión
- `GET /carrito` - Carrito de compras (básico)

### APIs del Backend

El backend está en http://localhost:3001 y expone rutas REST (ver `backend/respuestasServicios.md`).

#### Libros
- `GET /api/libros` - Obtener todos los libros
- `GET /api/libros/:id` - Obtener libro por ID
- `POST /api/libros` - Crear nuevo libro
- `PUT /api/libros/:id` - Actualizar libro
- `DELETE /api/libros/:id` - Eliminar libro

#### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/:id` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/:id` - Actualizar categoría
- `DELETE /api/categorias/:id` - Eliminar categoría

#### Autores
- `GET /api/autores` - Obtener todos los autores
- `GET /api/autores/:id` - Obtener autor por ID
- `POST /api/autores` - Crear nuevo autor
- `PUT /api/autores/:id` - Actualizar autor
- `DELETE /api/autores/:id` - Eliminar autor

#### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

#### Pedidos
- `GET /api/pedidos` - Obtener todos los pedidos
- `GET /api/pedidos/:id` - Obtener pedido por ID
- `POST /api/pedidos` - Crear nuevo pedido
- `PUT /api/pedidos/:id` - Actualizar pedido
- `DELETE /api/pedidos/:id` - Eliminar pedido

### Imágenes de autores
Coloca en `frontend/public/images/` las imágenes con estos nombres para usar fotos reales:

- `garcia-marquez.jpg`
- `isabel-allende.jpg`
- `mario-vargas-llosa.jpg`
- `julio-cortazar.jpg`
- `octavio-paz.jpg`
- `stephen-king.jpg`

Luego ejecuta en backend:

```bash
cd backend
npm run update-author-images
```

### Notas de Desarrollo

- El backend ya está configurado con CORS para recibir peticiones del frontend
- Usa `axios` para hacer peticiones al backend
- Bootstrap está disponible para usar vía CDN o puedes instalarlo
- Las variables de entorno están en `.env`
