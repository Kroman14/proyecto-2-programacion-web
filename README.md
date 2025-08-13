# 📚 LibroStore - Ecommerce de Libros

**LibroStore** es una aplicación web full-stack para la venta de libros online, desarrollada con tecnologías modernas y una arquitectura robusta.

## 🚀 **Características Principales**

- **Frontend**: Interfaz moderna con Handlebars.js y Bootstrap 5
- **Backend**: API REST con Node.js, Express y Sequelize
- **Base de Datos**: MySQL con ORM Sequelize
- **Autenticación**: JWT con bcryptjs para seguridad
- **Gestión de Stock**: Validación automática de inventario
- **Panel de Administración**: Gestión completa de productos y usuarios
- **Responsive Design**: Optimizado para todos los dispositivos

## 🏗️ **Arquitectura del Proyecto**

```
proyecto-2-programacion-web/
├── backend/                 # Servidor API REST
│   ├── index.js            # Servidor principal
│   ├── models.js           # Modelos de Sequelize
│   ├── setup.js            # Configuración de base de datos
│   ├── seeder.js           # Datos de prueba
│   └── update-images.js    # Script de actualización de imágenes
├── frontend/               # Cliente web
│   ├── index.js            # Servidor frontend
│   ├── views/              # Plantillas Handlebars
│   ├── public/             # Archivos estáticos
│   └── package.json        # Dependencias frontend
└── README.md               # Este archivo
```

## 🛠️ **Tecnologías Utilizadas**

### **Backend**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL2** - Driver de base de datos
- **JWT** - Autenticación stateless
- **bcryptjs** - Hash de contraseñas
- **CORS** - Cross-origin resource sharing
- **dotenv** - Variables de entorno

### **Frontend**
- **Express.js** - Servidor de vistas
- **Handlebars.js** - Motor de plantillas
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **Axios** - Cliente HTTP
- **CSS3** - Estilos personalizados

## 📊 **Estructura de la Base de Datos**

### **Tablas Principales**
- **`usuarios`** - Gestión de usuarios y autenticación
- **`categorias`** - Categorías de libros
- **`autores`** - Información de autores
- **`libros`** - Catálogo de libros con stock
- **`pedidos`** - Historial de pedidos
- **`detalle_pedidos`** - Detalles de cada pedido

### **Relaciones**
- Usuarios → Pedidos (1:N)
- Libros → Detalle_Pedidos (1:N)
- Categorías → Libros (1:N)
- Autores → Libros (1:N)

## 🚀 **Instalación y Configuración**

### **Prerrequisitos**
- Node.js (v14 o superior)
- MySQL (v8.0 o superior)
- npm o yarn

### **1. Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd proyecto-2-programacion-web
```

### **2. Configurar Backend**
```bash
cd backend
npm install
```

**Crear archivo `.env`:**
```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=ecommerce_libros
DB_PORT=3306
JWT_SECRET=tu_secreto_jwt_super_seguro
PORT=3001
```

### **3. Configurar Base de Datos**
```bash
npm run setup      # Crear base de datos
npm run seed       # Insertar datos de prueba
npm run update-images  # Actualizar rutas de imágenes
```

### **4. Configurar Frontend**
```bash
cd ../frontend
npm install
```

### **5. Ejecutar el Proyecto**

**Terminal 1 - Backend:**
```bash
cd backend
npm start          # o npm run dev para desarrollo
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🌐 **URLs de Acceso**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Documentación API**: Ver `backend/respuestasServicios.md`

## 📱 **Funcionalidades Implementadas**

### **✅ Completadas**
- [x] **Página Principal (Landing Page)** - Diseño moderno y responsive
- [x] **Sistema de Imágenes** - Gestión de portadas de libros
- [x] **API REST Completa** - Endpoints para todas las entidades
- [x] **Base de Datos** - Estructura completa con relaciones
- [x] **Autenticación JWT** - Sistema seguro de login/registro
- [x] **Gestión de Stock** - Validación automática de inventario
- [x] **Frontend Responsive** - Diseño adaptativo con Bootstrap 5

### **🔄 En Desarrollo**
- [ ] **Sistema de Carrito** - Gestión de productos en carrito
- [ ] **Proceso de Compra** - Checkout y confirmación
- [ ] **Panel de Usuario** - Perfil y historial de pedidos
- [ ] **Panel de Administración** - Gestión completa del sistema

### **📋 Pendientes**
- [ ] **Búsqueda y Filtros** - Búsqueda avanzada de libros
- [ ] **Sistema de Reviews** - Calificaciones y comentarios
- [ ] **Notificaciones** - Email y notificaciones push
- [ ] **Pagos Online** - Integración con pasarelas de pago
- [ ] **Reportes** - Estadísticas y análisis de ventas

## 🔧 **Scripts Disponibles**

### **Backend**
```bash
npm start          # Iniciar servidor
npm run dev        # Modo desarrollo con nodemon
npm run setup      # Configurar base de datos
npm run seed       # Insertar datos de prueba
npm run reset      # Resetear base de datos
npm run update-images  # Actualizar rutas de imágenes
```

### **Frontend**
```bash
npm start          # Iniciar servidor frontend
```

## 📁 **Estructura de Archivos**

### **Backend**
- **`index.js`** - Servidor principal y rutas API
- **`models.js`** - Definición de modelos Sequelize
- **`setup.js`** - Script de configuración de BD
- **`seeder.js`** - Datos de prueba
- **`update-images.js`** - Actualización de imágenes

### **Frontend**
- **`index.js`** - Servidor de vistas y configuración
- **`views/`** - Plantillas Handlebars
  - **`layouts/main.handlebars`** - Layout principal
  - **`home.handlebars`** - Página principal
- **`public/`** - Archivos estáticos
  - **`css/style.css`** - Estilos personalizados
  - **`js/main.js`** - JavaScript del cliente
  - **`images/`** - Imágenes de portadas

## 🔒 **Seguridad**

- **JWT Tokens** para autenticación stateless
- **bcryptjs** para hash seguro de contraseñas
- **CORS** configurado para control de acceso
- **Validación** de datos en entrada y salida
- **Sanitización** de inputs para prevenir inyecciones

## 📱 **Responsive Design**

- **Mobile First** - Diseño optimizado para móviles
- **Bootstrap 5** - Framework CSS responsive
- **Breakpoints** - Adaptación a diferentes tamaños
- **Touch Friendly** - Interfaz optimizada para touch

## 🚀 **Despliegue**

### **Recomendaciones**
- **Backend**: Node.js en servidor Linux/Windows
- **Base de Datos**: MySQL en servidor dedicado
- **Frontend**: Servidor web (Apache/Nginx) o CDN
- **SSL**: Certificado HTTPS obligatorio
- **Backup**: Respaldo automático de base de datos

### **Variables de Entorno de Producción**
```env
NODE_ENV=production
DB_HOST=tu_host_produccion
DB_USER=usuario_produccion
DB_PASSWORD=password_seguro
JWT_SECRET=secreto_super_seguro_produccion
```

## 🤝 **Contribución**

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👥 **Autores**

- **Equipo de Desarrollo** - Trabajo inicial
- **Contribuidores** - Mejoras y funcionalidades adicionales

## 🙏 **Agradecimientos**

- **Bootstrap** por el framework CSS
- **Handlebars** por el motor de plantillas
- **Sequelize** por el ORM robusto
- **Comunidad Node.js** por las librerías

## 📞 **Soporte**

- **Issues**: Crear issue en GitHub
- **Documentación**: Ver archivos README en cada carpeta
- **API**: Consultar `backend/respuestasServicios.md`

---

**⭐ ¡No olvides darle una estrella al proyecto si te gustó! ⭐**
