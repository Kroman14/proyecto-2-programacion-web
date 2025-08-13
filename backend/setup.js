const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  try {
    // Conectar sin especificar base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    console.log('✅ Conectado a MySQL');

    // Crear la base de datos si no existe
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log(`✅ Base de datos '${process.env.DB_NAME}' creada exitosamente`);

    await connection.end();
    console.log('🔌 Conexión cerrada');

  } catch (error) {
    console.error('❌ Error creando la base de datos:', error.message);
    throw error;
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createDatabase()
    .then(() => {
      console.log('🎉 Setup completado. Ahora puedes ejecutar el seeder.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error en setup:', error.message);
      process.exit(1);
    });
}

module.exports = { createDatabase };
