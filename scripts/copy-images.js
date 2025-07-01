const fs = require('fs');
const path = require('path');

// Rutas de origen y destino
const sourceDir = path.join(__dirname, '..', 'public', 'images', 'agrupacion', 'fotos');
const destDir = path.join(__dirname, '..', 'public', 'images');

// Función para copiar un archivo
function copyFile(source, destination) {
  try {
    fs.copyFileSync(source, destination);
    console.log(`✅ Archivo copiado: ${destination}`);
  } catch (error) {
    console.error(`❌ Error al copiar el archivo: ${error.message}`);
  }
}

// Función para copiar las imágenes de la galería
function copyGalleryImages() {
  // Crear el directorio de destino si no existe
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`✅ Directorio creado: ${destDir}`);
  }

  // Copiar las imágenes de la galería
  for (let i = 1; i <= 6; i++) {
    const sourceFile = path.join(sourceDir, `gallery-${i}.jpg`);
    const destFile = path.join(destDir, `kaiser-gallery-${i}.jpg`);
    
    if (fs.existsSync(sourceFile)) {
      copyFile(sourceFile, destFile);
    } else {
      console.error(`❌ Archivo no encontrado: ${sourceFile}`);
    }
  }
}

// Ejecutar la función
copyGalleryImages(); 