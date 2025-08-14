const { sequelize, Autor } = require('./models');

const authorImageMap = {
  'Gabriel García Márquez': 'https://www.agenciabalcells.com/fileadmin/_processed_/csm_garcia_marquez__gabriel_f26894719d.jpg',
  'Isabel Allende': 'https://m.media-amazon.com/images/M/MV5BMjA0MjEyYTUtNDAxNi00YjY1LWI5NWItMWFhNmNmOGNkZjRmXkEyXkFqcGc@._V1_.jpg',
  'Mario Vargas Llosa': 'https://www.ccincagarcilaso.gob.pe/wp-content/uploads/2021/06/mvll040-6.jpg',
  'Julio Cortázar': 'https://media.admagazine.com/photos/618a63bca8ad6c5249a74efa/4:3/w_2000,h_1500,c_limit/74842.jpg',
  'Octavio Paz': 'https://upload.wikimedia.org/wikipedia/commons/5/55/Octavio_Paz_1984_%28colorized%29.jpg',
  'Stephen King': 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/11/stephen-king-2872245.jpg?tf=1200x1200'
};

async function updateAuthorImages() {
  try {
    let updated = 0;
    for (const [authorName, imagePath] of Object.entries(authorImageMap)) {
      const autor = await Autor.findOne({ where: { nombre: authorName } });
      if (!autor) {
        console.log(`❌ Autor no encontrado: ${authorName}`);
        continue;
      }
      await autor.update({ foto: imagePath });
      console.log(`✅ Actualizado: ${authorName} -> ${imagePath}`);
      updated++;
    }
    console.log(`\n📊 Autores actualizados: ${updated}`);
  } catch (err) {
    console.error('❌ Error actualizando imágenes de autores:', err.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
}

if (require.main === module) {
  updateAuthorImages();
}

module.exports = { updateAuthorImages };


