const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_libros',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Desactivar logs de SQL en consola
  }
);

// Modelo Usuario
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rol: {
    type: DataTypes.ENUM('cliente', 'admin'),
    defaultValue: 'cliente'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'fecha_registro',
  updatedAt: false
});

// Modelo Categoria
const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'categorias',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: false
});

// Modelo Autor
const Autor = sequelize.define('Autor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  biografia: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  nacionalidad: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  foto: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'autores',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: false
});

// Modelo Libro
const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isbn: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  paginas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fecha_publicacion: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  editorial: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  idioma: {
    type: DataTypes.STRING(50),
    defaultValue: 'Español'
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'libros',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: false
});

// Modelo Pedido
const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  direccion_envio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  telefono_contacto: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'pedidos',
  timestamps: true,
  createdAt: 'fecha_pedido',
  updatedAt: 'fecha_actualizacion'
});

// Modelo DetallePedido
const DetallePedido = sequelize.define('DetallePedido', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'detalle_pedidos',
  timestamps: false
});

// Definir las relaciones
// Libro pertenece a una Categoria
Libro.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria'
});
Categoria.hasMany(Libro, {
  foreignKey: 'categoria_id',
  as: 'libros'
});

// Libro pertenece a un Autor
Libro.belongsTo(Autor, {
  foreignKey: 'autor_id',
  as: 'autor'
});
Autor.hasMany(Libro, {
  foreignKey: 'autor_id',
  as: 'libros'
});

// Pedido pertenece a un Usuario
Pedido.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario'
});
Usuario.hasMany(Pedido, {
  foreignKey: 'usuario_id',
  as: 'pedidos'
});

// DetallePedido pertenece a un Pedido
DetallePedido.belongsTo(Pedido, {
  foreignKey: 'pedido_id',
  as: 'pedido'
});
Pedido.hasMany(DetallePedido, {
  foreignKey: 'pedido_id',
  as: 'detalles'
});

// DetallePedido pertenece a un Libro
DetallePedido.belongsTo(Libro, {
  foreignKey: 'libro_id',
  as: 'libro'
});
Libro.hasMany(DetallePedido, {
  foreignKey: 'libro_id',
  as: 'detalles_pedido'
});

module.exports = {
  sequelize,
  Usuario,
  Categoria,
  Autor,
  Libro,
  Pedido,
  DetallePedido
};
