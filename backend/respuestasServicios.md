# 📋 RESPUESTAS DE SERVICIOS - ECOMMERCE LIBROS API

## 🌐 Información General
- **URL Base:** `http://localhost:3001`
- **Formato:** JSON
- **Método de Autenticación:** JWT Token (para endpoints protegidos)
- **CORS:** Habilitado para `http://localhost:3000`

---

## 📚 LIBROS

### GET `/libros` - Obtener todos los libros
**Descripción:** Retorna la lista completa de libros disponibles con información de autor y categoría.

**Request:**
```http
GET http://localhost:3001/libros
Content-Type: application/json
```

**Response (200):**
```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "descripcion": "Una obra maestra del realismo mágico que narra la historia de la familia Buendía...",
    "isbn": "978-84-376-0494-7",
    "precio": "25.99",
    "stock": 15,
    "paginas": 417,
    "fecha_publicacion": "1967-06-05",
    "editorial": "Editorial Sudamericana",
    "idioma": "Español",
    "imagen": "cien-anos-soledad.jpg",
    "categoria_id": 1,
    "autor_id": 1,
    "activo": true,
    "createdAt": "2025-08-13T15:30:00.000Z",
    "updatedAt": "2025-08-13T15:30:00.000Z",
    "Categoria": {
      "id": 1,
      "nombre": "Ficción Literaria",
      "descripcion": "Novelas y relatos de ficción de alta calidad literaria"
    },
    "Autor": {
      "id": 1,
      "nombre": "Gabriel García Márquez",
      "biografia": "Escritor colombiano, premio Nobel de Literatura 1982..."
    }
  }
]
```

### GET `/libros/:id` - Obtener un libro específico
**Descripción:** Retorna la información detallada de un libro por su ID.

**Request:**
```http
GET http://localhost:3001/libros/1
Content-Type: application/json
```

**Response (200):**
```json
{
  "id": 1,
  "titulo": "Cien años de soledad",
  "descripcion": "Una obra maestra del realismo mágico...",
  "isbn": "978-84-376-0494-7",
  "precio": "25.99",
  "stock": 15,
  "paginas": 417,
  "fecha_publicacion": "1967-06-05",
  "editorial": "Editorial Sudamericana",
  "idioma": "Español",
  "imagen": "cien-anos-soledad.jpg",
  "categoria_id": 1,
  "autor_id": 1,
  "activo": true,
  "createdAt": "2025-08-13T15:30:00.000Z",
  "updatedAt": "2025-08-13T15:30:00.000Z",
  "Categoria": {
    "id": 1,
    "nombre": "Ficción Literaria",
    "descripcion": "Novelas y relatos de ficción de alta calidad literaria"
  },
  "Autor": {
    "id": 1,
    "nombre": "Gabriel García Márquez",
    "biografia": "Escritor colombiano, premio Nobel de Literatura 1982..."
  }
}
```

**Response (404):**
```json
{
  "error": "Libro no encontrado"
}
```

### POST `/libros` - Crear un nuevo libro
**Descripción:** Crea un nuevo libro en el sistema.

**Request:**
```http
POST http://localhost:3001/libros
Content-Type: application/json

{
  "titulo": "El Quijote",
  "descripcion": "La obra más famosa de Miguel de Cervantes",
  "isbn": "978-84-376-0123-4",
  "precio": 29.99,
  "stock": 20,
  "paginas": 863,
  "fecha_publicacion": "1605-01-16",
  "editorial": "Editorial Planeta",
  "idioma": "Español",
  "imagen": "el-quijote.jpg",
  "categoria_id": 1,
  "autor_id": 2
}
```

**Response (201):**
```json
{
  "message": "Libro creado exitosamente",
  "libro": {
    "id": 11,
    "titulo": "El Quijote",
    "descripcion": "La obra más famosa de Miguel de Cervantes",
    "isbn": "978-84-376-0123-4",
    "precio": "29.99",
    "stock": 20,
    "paginas": 863,
    "fecha_publicacion": "1605-01-16",
    "editorial": "Editorial Planeta",
    "idioma": "Español",
    "imagen": "el-quijote.jpg",
    "categoria_id": 1,
    "autor_id": 2,
    "activo": true,
    "updatedAt": "2025-08-13T16:00:00.000Z",
    "createdAt": "2025-08-13T16:00:00.000Z"
  }
}
```

### PUT `/libros/:id` - Actualizar un libro
**Descripción:** Actualiza la información de un libro existente.

**Request:**
```http
PUT http://localhost:3001/libros/1
Content-Type: application/json

{
  "titulo": "Cien años de soledad - Edición Especial",
  "precio": 35.99,
  "stock": 25
}
```

**Response (200):**
```json
{
  "message": "Libro actualizado exitosamente"
}
```

### DELETE `/libros/:id` - Eliminar un libro (soft delete)
**Descripción:** Marca un libro como inactivo sin eliminarlo físicamente.

**Request:**
```http
DELETE http://localhost:3001/libros/1
```

**Response (200):**
```json
{
  "message": "Libro eliminado exitosamente"
}
```

---

## 📁 CATEGORÍAS

### GET `/categorias` - Obtener todas las categorías
**Request:**
```http
GET http://localhost:3001/categorias
```

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Ficción Literaria",
    "descripcion": "Novelas y relatos de ficción de alta calidad literaria",
    "imagen": "ficcion-literaria.jpg",
    "activo": true,
    "createdAt": "2025-08-13T15:30:00.000Z",
    "updatedAt": "2025-08-13T15:30:00.000Z"
  }
]
```

### GET `/categorias/:id/libros` - Obtener libros por categoría
**Request:**
```http
GET http://localhost:3001/categorias/1/libros
```

**Response (200):**
```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "precio": "25.99",
    "imagen": "cien-anos-soledad.jpg",
    "Autor": {
      "nombre": "Gabriel García Márquez"
    }
  }
]
```

### POST `/categorias` - Crear nueva categoría
**Request:**
```http
POST http://localhost:3001/categorias
Content-Type: application/json

{
  "nombre": "Ciencia Ficción",
  "descripcion": "Libros de ciencia ficción y fantasía",
  "imagen": "ciencia-ficcion.jpg"
}
```

---

## ✍️ AUTORES

### GET `/autores` - Obtener todos los autores
**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Gabriel García Márquez",
    "biografia": "Escritor colombiano, premio Nobel de Literatura 1982...",
    "fecha_nacimiento": "1927-03-06",
    "nacionalidad": "Colombiana",
    "foto": "gabriel-garcia-marquez.jpg",
    "activo": true,
    "createdAt": "2025-08-13T15:30:00.000Z",
    "updatedAt": "2025-08-13T15:30:00.000Z"
  }
]
```

### GET `/autores/:id/libros` - Obtener libros por autor
**Request:**
```http
GET http://localhost:3001/autores/1/libros
```

**Response (200):**
```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "precio": "25.99",
    "imagen": "cien-anos-soledad.jpg",
    "Categoria": {
      "nombre": "Ficción Literaria"
    }
  }
]
```

---

## 👥 USUARIOS

### GET `/usuarios` - Obtener todos los usuarios
**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Administrador",
    "email": "admin@ecommerce.com",
    "telefono": "+57 300 123 4567",
    "direccion": "Calle 123 #45-67, Bogotá",
    "rol": "admin",
    "activo": true,
    "createdAt": "2025-08-13T15:30:00.000Z",
    "updatedAt": "2025-08-13T15:30:00.000Z"
  }
]
```

### POST `/usuarios` - Crear nuevo usuario
**Request:**
```http
POST http://localhost:3001/usuarios
Content-Type: application/json

{
  "nombre": "María Pérez",
  "email": "maria@email.com",
  "password": "password123",
  "telefono": "+57 301 234 5678",
  "direccion": "Carrera 10 #20-30, Medellín",
  "rol": "cliente"
}
```

**Response (201):**
```json
{
  "message": "Usuario creado exitosamente",
  "usuario": {
    "id": 4,
    "nombre": "María Pérez",
    "email": "maria@email.com",
    "telefono": "+57 301 234 5678",
    "direccion": "Carrera 10 #20-30, Medellín",
    "rol": "cliente",
    "activo": true,
    "updatedAt": "2025-08-13T16:00:00.000Z",
    "createdAt": "2025-08-13T16:00:00.000Z"
  }
}
```

---

## 🛒 PEDIDOS

### GET `/pedidos` - Obtener todos los pedidos
**Response (200):**
```json
[
  {
    "id": 1,
    "usuario_id": 2,
    "total": "45.98",
    "estado": "pendiente",
    "direccion_envio": "Carrera 15 #30-45, Apartamento 301, Bogotá",
    "telefono_contacto": "+57 301 234 5678",
    "notas": "Entregar en horario de oficina",
    "createdAt": "2025-08-13T15:30:00.000Z",
    "updatedAt": "2025-08-13T15:30:00.000Z",
    "Usuario": {
      "id": 2,
      "nombre": "Juan Pérez",
      "email": "juan@email.com"
    }
  }
]
```

### GET `/pedidos/:id` - Obtener pedido específico con detalles
**Response (200):**
```json
{
  "id": 1,
  "usuario_id": 2,
  "total": "45.98",
  "estado": "pendiente",
  "direccion_envio": "Carrera 15 #30-45, Apartamento 301, Bogotá",
  "telefono_contacto": "+57 301 234 5678",
  "notas": "Entregar en horario de oficina",
  "createdAt": "2025-08-13T15:30:00.000Z",
  "updatedAt": "2025-08-13T15:30:00.000Z",
  "Usuario": {
    "nombre": "Juan Pérez",
    "email": "juan@email.com"
  },
  "DetallePedidos": [
    {
      "id": 1,
      "cantidad": 1,
      "precio_unitario": "25.99",
      "subtotal": "25.99",
      "Libro": {
        "id": 1,
        "titulo": "Cien años de soledad",
        "imagen": "cien-anos-soledad.jpg",
        "Autor": {
          "nombre": "Gabriel García Márquez"
        }
      }
    },
    {
      "id": 2,
      "cantidad": 1,
      "precio_unitario": "19.99",
      "subtotal": "19.99",
      "Libro": {
        "id": 2,
        "titulo": "El amor en los tiempos del cólera",
        "imagen": "amor-tiempos-colera.jpg",
        "Autor": {
          "nombre": "Gabriel García Márquez"
        }
      }
    }
  ]
}
```

### POST `/pedidos` - Crear nuevo pedido
**Request:**
```http
POST http://localhost:3001/pedidos
Content-Type: application/json

{
  "usuario_id": 2,
  "direccion_envio": "Calle 50 #25-30, Casa 12, Cali",
  "telefono_contacto": "+57 302 345 6789",
  "notas": "Llamar antes de entregar",
  "libros": [
    {
      "libro_id": 1,
      "cantidad": 2
    },
    {
      "libro_id": 3,
      "cantidad": 1
    }
  ]
}
```

**Response (201):**
```json
{
  "message": "Pedido creado exitosamente",
  "pedido": {
    "id": 3,
    "usuario_id": 2,
    "total": "71.97",
    "estado": "pendiente",
    "direccion_envio": "Calle 50 #25-30, Casa 12, Cali",
    "telefono_contacto": "+57 302 345 6789",
    "notas": "Llamar antes de entregar",
    "updatedAt": "2025-08-13T16:00:00.000Z",
    "createdAt": "2025-08-13T16:00:00.000Z"
  }
}
```

### PUT `/pedidos/:id/estado` - Actualizar estado del pedido
**Request:**
```http
PUT http://localhost:3001/pedidos/1/estado
Content-Type: application/json

{
  "estado": "enviado"
}
```

**Response (200):**
```json
{
  "message": "Estado del pedido actualizado exitosamente"
}
```

---

## 🔍 BÚSQUEDAS Y FILTROS

### GET `/libros/buscar/:termino` - Buscar libros
**Descripción:** Busca libros por título, descripción, autor o categoría.

**Request:**
```http
GET http://localhost:3001/libros/buscar/garcía
```

**Response (200):**
```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "precio": "25.99",
    "Autor": {
      "nombre": "Gabriel García Márquez"
    },
    "Categoria": {
      "nombre": "Ficción Literaria"
    }
  }
]
```

---

## 📊 ESTADÍSTICAS

### GET `/estadisticas` - Obtener estadísticas generales
**Response (200):**
```json
{
  "total_libros": 10,
  "total_usuarios": 3,
  "total_pedidos": 2,
  "total_categorias": 6,
  "total_autores": 6,
  "ventas_mes_actual": "45.98",
  "libro_mas_vendido": {
    "titulo": "Cien años de soledad",
    "total_vendido": 5
  }
}
```

---

## ⚠️ CÓDIGOS DE ERROR COMUNES

### 400 - Bad Request
```json
{
  "error": "Datos inválidos",
  "details": "El campo 'titulo' es requerido"
}
```

### 404 - Not Found
```json
{
  "error": "Recurso no encontrado"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Error interno del servidor"
}
```

---

## 🔧 EJEMPLOS DE USO CON JAVASCRIPT

### Obtener libros con fetch:
```javascript
async function obtenerLibros() {
  try {
    const response = await fetch('http://localhost:3001/libros');
    const libros = await response.json();
    console.log(libros);
    return libros;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Crear un nuevo libro:
```javascript
async function crearLibro(datosLibro) {
  try {
    const response = await fetch('http://localhost:3001/libros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosLibro)
    });
    
    const resultado = await response.json();
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Crear un pedido:
```javascript
async function crearPedido(datosPedido) {
  try {
    const response = await fetch('http://localhost:3001/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPedido)
    });
    
    const resultado = await response.json();
    console.log(resultado);
    return resultado;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📝 NOTAS IMPORTANTES

1. **Formato de fechas:** Se usan fechas en formato ISO 8601 (YYYY-MM-DD)
2. **Precios:** Se manejan como strings con formato decimal "25.99"
3. **IDs:** Todos los IDs son números enteros
4. **Soft Delete:** Los registros no se eliminan físicamente, solo se marcan como inactivos
5. **CORS:** Configurado para permitir peticiones desde localhost:3000
6. **Base de datos:** MySQL con Sequelize ORM
7. **Puerto:** El servidor corre en el puerto 3001

---

## 🚀 COMANDOS ÚTILES

```bash
# Iniciar servidor
npm start

# Desarrollo con auto-reload
npm run dev

# Recrear base de datos
npm run setup

# Poblar con datos de prueba
npm run seed

# Reset completo
npm run reset
```

---

*Documentación generada para Ecommerce de Libros API v1.0.0*
*Última actualización: 13 de Agosto, 2025*
