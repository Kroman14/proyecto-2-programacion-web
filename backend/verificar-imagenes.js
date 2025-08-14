const axios = require('axios');

// Función para verificar las imágenes en la base de datos
async function verificarImagenes() {
  try {
    console.log('🔍 Verificando imágenes en la base de datos...\n');
    
    const response = await axios.get('http://localhost:3001/libros');
    const libros = response.data.libros || response.data;
    
    if (!Array.isArray(libros)) {
      console.error('❌ La respuesta no es un array:', libros);
      return;
    }
    
    console.log(`📚 Total de libros encontrados: ${libros.length}\n`);
    
    for (const libro of libros) {
      console.log(`📖 Libro: ${libro.titulo}`);
      console.log(`   ID: ${libro.id}`);
      
      // Verificar diferentes posibles nombres de campo para la imagen
      const imagenUrl = libro.imagen || libro.imagen_url || libro.imageUrl || libro.cover_url;
      console.log(`   Imagen URL: ${imagenUrl || 'SIN URL'}`);
      
      if (imagenUrl) {
        try {
          const imgResponse = await axios.head(imagenUrl, { timeout: 5000 });
          console.log(`   ✅ Imagen accesible (${imgResponse.status})`);
        } catch (error) {
          console.log(`   ❌ Imagen no accesible: ${error.message}`);
        }
      } else {
        console.log(`   ⚠️  Sin URL de imagen`);
      }
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error conectando con el backend:', error.message);
    console.log('Asegúrate de que el backend esté ejecutándose en http://localhost:3001');
  }
}

verificarImagenes();
