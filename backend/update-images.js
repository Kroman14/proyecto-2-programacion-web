const { sequelize, Libro } = require('./models');

// URLs alternativas más confiables para las portadas
const alternativeImageURLs = {
  'Cien años de soledad': 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327881361i/320.jpg', // Ya funciona
  'La casa de los espíritus': 'https://www.mejoreslibros.top/wp-content/uploads/2021/02/La-casa-de-los-espiritus-395x600.jpg',
  'Conversación en La Catedral': 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1738418016i/2091367.jpg',
  'Rayuela': 'https://educacion.ufm.edu/wp-content/uploads/2013/07/Rayuela.jpg',
  'El laberinto de la soledad': 'https://m.media-amazon.com/images/I/71xj4kkkl9L._SY466_.jpg', // Ya funciona
  'IT (ESO)': 'https://images.cdn1.buscalibre.com/fit-in/360x360/c8/e8/c8e8567ca80b4bb032e5390c7e1b012d.jpg',
  'Eva Luna': 'https://images.cdn1.buscalibre.com/fit-in/360x360/56/04/5604580bb1702011b63a9e0e180412d8.jpg',
  'El resplandor': 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg', // Ya funciona
  'Bestiario': 'https://www.fakirediciones.com/wp-content/uploads/2020/05/portadabestiario.jpg',
  'El amor en los tiempos del cólera': 'https://m.media-amazon.com/images/I/81YPlYG-b9L._UF1000,1000_QL80_.jpg'
};

const updateWithWorkingImages = async () => {
  try {
    console.log('🔄 Actualizando con URLs alternativas que funcionan...\n');
    
    let actualizados = 0;
    let noEncontrados = 0;
    
    for (const [titulo, imagenURL] of Object.entries(alternativeImageURLs)) {
      const libro = await Libro.findOne({ where: { titulo } });
      
      if (libro) {
        await libro.update({ imagen: imagenURL });
        console.log(`✅ ${titulo}`);
        console.log(`   🔗 ${imagenURL}`);
        actualizados++;
      } else {
        console.log(`❌ Libro no encontrado: ${titulo}`);
        noEncontrados++;
      }
      console.log('');
    }
    
    console.log(`📊 Resumen de actualización:`);
    console.log(`   ✅ Libros actualizados: ${actualizados}`);
    console.log(`   ❌ Libros no encontrados: ${noEncontrados}`);
    console.log('🎉 ¡Actualización completada con URLs que funcionan!');
    
    console.log('\n💡 NOTA: Usando URLs de Amazon que son más estables');
    console.log('🔗 Estas URLs deberían funcionar correctamente en el frontend');
    
  } catch (error) {
    console.error('❌ Error actualizando imágenes:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  updateWithWorkingImages();
}

module.exports = { updateWithWorkingImages };
