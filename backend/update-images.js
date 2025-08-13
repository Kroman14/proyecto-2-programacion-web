const { sequelize, Libro } = require('./models');

// Mapeo de títulos a nombres de archivos locales
const imageMapping = {
  'Cien años de soledad': 'Cien-años-de-soledad.jpg',
  'La casa de los espíritus': 'La-casa-de-los-espiritus.jpg',
  'Conversación en La Catedral': 'Conversacion-en-La-Catedral.jpg',
  'Rayuela': 'rayuela.jpg',
  'El laberinto de la soledad': 'El-laberinto-de-la-soledad.jpg',
  'IT (ESO)': 'IT.jpg',
  'Eva Luna': 'eva-luna.jpg',
  'El resplandor': 'El-Resplandor.jpg',
  'Bestiario': 'Bestiario.jpg',
  'El amor en los tiempos del cólera': 'El-amor-en-los-tiempos-del-colera.jpg'
};

const updateImages = async () => {
  try {
    console.log('🔄 Iniciando actualización de imágenes...');
    
    for (const [titulo, imagen] of Object.entries(imageMapping)) {
      const libro = await Libro.findOne({ where: { titulo } });
      
      if (libro) {
        await libro.update({ imagen });
        console.log(`✅ ${titulo} → ${imagen}`);
      } else {
        console.log(`❌ Libro no encontrado: ${titulo}`);
      }
    }
    
    console.log('🎉 Actualización de imágenes completada');
    
    // Mostrar resultado final
    const libros = await Libro.findAll({
      attributes: ['titulo', 'imagen'],
      order: [['titulo', 'ASC']]
    });
    
    console.log('\n📚 Estado final de imágenes:');
    libros.forEach(libro => {
      console.log(`📖 ${libro.titulo}: ${libro.imagen}`);
    });
    
  } catch (error) {
    console.error('❌ Error actualizando imágenes:', error);
  } finally {
    await sequelize.close();
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  updateImages();
}

module.exports = { updateImages };
