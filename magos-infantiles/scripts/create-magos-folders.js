const fs = require('fs');
const path = require('path');

const magos = [
  'kaiser',
  'twister',
  'noble-mago',
  'alanfu',
  'alvaro',
  'pepe',
  'sonyq',
  'felipe-verel',
  'barba-azul'
];

const basePath = path.join(__dirname, '..', 'public', 'images', 'magos');

// Función para crear una carpeta si no existe
function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✅ Carpeta creada: ${folderPath}`);
  } else {
    console.log(`ℹ️ La carpeta ya existe: ${folderPath}`);
  }
}

// Crear la carpeta base si no existe
createFolderIfNotExists(basePath);

// Crear carpetas para cada mago
magos.forEach(mago => {
  const magoPath = path.join(basePath, mago);
  createFolderIfNotExists(magoPath);
});

console.log('\nEstructura de carpetas creada exitosamente.');
console.log('\nEstructura creada:');
console.log('magos/');
magos.forEach(mago => {
  console.log(`├── ${mago}/`);
  console.log(`│   ├── carousel-1.jpg`);
  console.log(`│   ├── carousel-2.jpg`);
  console.log(`│   ├── carousel-3.jpg`);
  console.log(`│   ├── show.jpg`);
  console.log(`│   └── gallery-1.jpg hasta gallery-6.jpg`);
}); 