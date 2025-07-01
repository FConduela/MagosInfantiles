import { Metadata } from 'next';
import Image from 'next/image';
import Carousel from '@/components/magos/Carousel';
import MagoInfo from '@/components/magos/MagoInfo';
import VideoSection from '@/components/magos/VideoSection';
import ContactoSection from '@/components/magos/ContactoSection';
import { getMagoAlvaro } from '@/lib/api';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Mago Álvaro - Shows de Magia Infantil',
  description: 'Shows de magia infantil con el Mago Álvaro. Diversión garantizada para fiestas y eventos.',
};

export default async function AlvaroPage() {
  const magoData = await getMagoAlvaro();
  // Ruta absoluta a la carpeta de imágenes del mago
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'magos', 'alvaro');
  let galleryImages: string[] = [];
  try {
    galleryImages = fs.readdirSync(imagesDir)
      .filter(file => file.startsWith('gallery') && file.endsWith('.jpg'))
      .sort();
  } catch (e) {
    galleryImages = [];
  }

  const slides = [
    { src: '/images/magos/alvaro/carousel-1.jpg', alt: 'Mago Álvaro Show 1' },
    { src: '/images/magos/alvaro/carousel-2.jpg', alt: 'Mago Álvaro Show 2' },
    { src: '/images/magos/alvaro/carousel-3.jpg', alt: 'Mago Álvaro Show 3' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F23]">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center pt-8 text-[#32C3F2]">
          {magoData.nombre}
        </h1>
        
        <Carousel slides={slides} />
      </section>
      
      <div className="mt-20 bg-[#1A1F33] p-8 rounded-lg">
        <MagoInfo 
          nombre={magoData.nombre}
          descripcion={magoData.descripcion}
          especialidad={magoData.especialidad}
        />
      </div>
      
      <VideoSection 
        videoSrc="/images/magos/alvaro/video.mp4"
        titulo={`Show de ${magoData.nombre}`}
      />
      
      {/* Sección Show */}
      <section className="mb-16">
        <div className="bg-[#1A1F33] rounded-lg p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Show</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-full">
              <h3 className="text-2xl font-bold text-[#32C3F2] mb-4">Contamos de 2 tipos de shows:</h3>
              
              <div className="mb-8">
                <h4 className="text-xl font-bold text-[#32C3F2] mb-3">SHOW ASOMBRO Y RISAS:</h4>
                <ul className="text-white list-disc list-inside space-y-2 mb-4">
                  <li>30 - 35 min. de magia y risas garantizadas</li>
                  <li>5 Rutinas mágicas interactivas para pequeños y grandes</li>
                </ul>
                <p className="text-[#32C3F2] font-bold">Precio $110.000</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#32C3F2] mb-3">SHOW DELUX:</h4>
                <ul className="text-white list-disc list-inside space-y-2 mb-4">
                  <li>40 - 45 min. de magia y risas garantizadas</li>
                  <li>7 Rutinas mágicas interactivas para pequeños y grandes</li>
                  <li>Escenografía y amplificación para una experiencia mágica más completa</li>
                  <li>Aparición de paloma real 🕊</li>
                </ul>
                <p className="text-[#32C3F2] font-bold">Precio $130.000</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-full">
              <Image
                src="/images/magos/alvaro/show.jpg"
                alt={`Show de ${magoData.nombre}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Galería */}
      <section className="mb-16">
        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((file, idx) => (
              <div key={file} className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={`/images/magos/alvaro/${file}`}
                  alt={`Galería Álvaro ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <ContactoSection 
        nombre={magoData.nombre}
        email={magoData.email}
        telefono={magoData.telefono}
        whatsapp={magoData.whatsapp}
        redesSociales={magoData.redesSociales}
      />
    </main>
  );
} 