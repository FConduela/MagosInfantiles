# Estructura de Imágenes para Magos

Cada mago tiene su propia carpeta con las siguientes imágenes:

## Estructura de Carpetas
```
magos/
├── kaiser/
│   ├── carousel-1.jpg
│   ├── carousel-2.jpg
│   ├── carousel-3.jpg
│   ├── show.jpg
│   └── gallery-1.jpg hasta gallery-6.jpg
├── twister/
│   ├── carousel-1.jpg
│   ├── carousel-2.jpg
│   ├── carousel-3.jpg
│   ├── show.jpg
│   └── gallery-1.jpg hasta gallery-6.jpg
└── ... (misma estructura para cada mago)
```

## Tipos de Imágenes

1. **Imágenes de Carrusel** (`carousel-1.jpg`, `carousel-2.jpg`, `carousel-3.jpg`)
   - Tamaño recomendado: 1200x800px
   - Formato: JPG
   - Uso: Carrusel principal en la página del mago

2. **Imagen de Show** (`show.jpg`)
   - Tamaño recomendado: 800x600px
   - Formato: JPG
   - Uso: Sección de show del mago

3. **Imágenes de Galería** (`gallery-1.jpg` hasta `gallery-6.jpg`)
   - Tamaño recomendado: 800x600px
   - Formato: JPG
   - Uso: Galería de fotos del mago

## Recomendaciones

- Optimiza todas las imágenes antes de subirlas
- Mantén un tamaño consistente para cada tipo de imagen
- Usa nombres de archivo en minúsculas y con guiones
- Asegúrate de que las imágenes sean de buena calidad pero no demasiado pesadas

## Cómo Subir Imágenes

1. Navega a la carpeta del mago correspondiente
2. Sube las imágenes con los nombres correctos
3. Asegúrate de que todas las imágenes necesarias estén presentes

## Notas Importantes

- Las imágenes son referenciadas en el código usando rutas relativas
- El formato de la ruta es: `/images/magos/[nombre-mago]/[tipo-imagen].jpg`
- Asegúrate de que los nombres de las carpetas coincidan exactamente con los nombres usados en el código 