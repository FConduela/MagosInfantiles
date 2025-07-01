# Magos Infantiles - Proyecto Completo

Este repositorio contiene el proyecto completo de **Magos Infantiles**, que incluye tanto el frontend como el backend.

## Estructura del Proyecto

```
mi/
├── magos-infantiles/          # Frontend (Next.js)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── magos-infantiles-backend/  # Backend (NestJS)
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── README.md
├── public/                    # Archivos públicos compartidos
├── scripts/                   # Scripts de utilidad
└── README.md                  # Este archivo
```

## Tecnologías Utilizadas

### Frontend (magos-infantiles/)
- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **React Responsive Carousel** - Carruseles responsivos

### Backend (magos-infantiles-backend/)
- **NestJS** - Framework de Node.js
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **Multer** - Manejo de archivos

## Instalación y Configuración

### Frontend
```bash
cd magos-infantiles
npm install
npm run dev
```

### Backend
```bash
cd magos-infantiles-backend
npm install
npm run start:dev
```

## Características Principales

- 🎭 **Gestión de Magos** - Información completa de cada mago
- 📸 **Galería de Imágenes** - Carruseles y galerías dinámicas
- 🎬 **Sección de Videos** - Videos de presentación
- 📰 **Sistema de Noticias** - Gestión de contenido
- 🔐 **Panel de Administración** - Gestión de usuarios y contenido
- 📱 **Diseño Responsivo** - Optimizado para todos los dispositivos

## Base de Datos

El proyecto utiliza PostgreSQL con Prisma como ORM. Las principales entidades son:

- **Mago** - Información de los magos
- **Noticia** - Sistema de noticias
- **Usuario** - Gestión de usuarios y autenticación
- **Imagen** - Almacenamiento de imágenes en base de datos

## Despliegue

### Frontend
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

### Backend
- **Railway**
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y pertenece a Magos Infantiles.

## Contacto

Para más información, contacta con el equipo de desarrollo. 