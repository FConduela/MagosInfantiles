'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Carousel from '@/components/magos/Carousel';
import MagoInfo from '@/components/magos/MagoInfo';
import VideoSection from '@/components/magos/VideoSection';
import ContactoSection from '@/components/magos/ContactoSection';
import { getMagoByNombre, Mago } from '@/lib/api';

export default function MagoPage() {
  const params = useParams();
  const [mago, setMago] = useState<Mago | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<number[]>([]);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    const fetchMago = async () => {
      try {
        const nombreMago = params.nombre as string;
        const data = await getMagoByNombre(nombreMago);
        setMago(data);
        
        // Verificar qué imágenes de galería existen
        const checkGalleryImages = async () => {
          const availableImages: number[] = [];
          for (let i = 1; i <= 6; i++) {
            try {
              const response = await fetch(`/images/magos/${nombreMago}/gallery-${i}.jpg`, { method: 'HEAD' });
              if (response.ok) {
                availableImages.push(i);
              }
            } catch (error) {
              // La imagen no existe, continuar con la siguiente
            }
          }
          setGalleryImages(availableImages);
        };

        // Verificar si existe el video
        const checkVideo = async () => {
          try {
            const response = await fetch(`/images/magos/${nombreMago}/video.mp4`, { method: 'HEAD' });
            setHasVideo(response.ok);
          } catch (error) {
            setHasVideo(false);
          }
        };
        
        checkGalleryImages();
        checkVideo();
      } catch (error) {
        console.error('Error al obtener datos del mago:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMago();
  }, [params.nombre]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F23]">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  if (!mago) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0F23]">
        <div className="text-red-500 text-xl">No se encontró el mago</div>
      </div>
    );
  }

  const nombreMago = params.nombre as string;
  const slides = [
    { src: `/images/magos/${nombreMago}/carousel-1.jpg`, alt: `Mago ${nombreMago} Show 1` },
    { src: `/images/magos/${nombreMago}/carousel-2.jpg`, alt: `Mago ${nombreMago} Show 2` },
    { src: `/images/magos/${nombreMago}/carousel-3.jpg`, alt: `Mago ${nombreMago} Show 3` },
  ];

  // Verificar si el mago tiene datos de show
  const hasShowData = mago.showAsombroNombre && mago.showAsombroPrecio && mago.showDeluxNombre && mago.showDeluxPrecio;

  return (
    <main className="min-h-screen bg-[#0A0F23]">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-center pt-8 text-[#32C3F2]">
          {mago.nombre}
        </h1>
        
        <Carousel slides={slides} />
      </section>
      
      <div className="mt-20 bg-[#1A1F33] p-8 rounded-lg">
        <MagoInfo 
          nombre={mago.nombre}
          descripcion={mago.descripcion}
          especialidad={mago.especialidad}
        />
      </div>
      
      {/* Sección Video - Solo se muestra si existe el archivo de video */}
      {hasVideo && (
        <VideoSection 
          videoSrc={`/images/magos/${nombreMago}/video.mp4`}
          titulo={`Show de ${mago.nombre}`}
        />
      )}
      
      {/* Sección Show - Solo se muestra si el mago tiene datos de show */}
      {hasShowData && (
        <section className="mb-16">
          <div className="bg-[#1A1F33] rounded-lg p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Show</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-full">
                <h3 className="text-2xl font-bold text-[#32C3F2] mb-4">Contamos de 2 tipos de shows:</h3>
                
                <div className="mb-8">
                  <h4 className="text-xl font-bold text-[#32C3F2] mb-3">{mago.showAsombroNombre}:</h4>
                  <ul className="text-white list-disc list-inside space-y-2 mb-4">
                    <li>{mago.showAsombroDuracion}</li>
                    <li>{mago.showAsombroRutinas}</li>
                  </ul>
                  <p className="text-[#32C3F2] font-bold">Precio {mago.showAsombroPrecio}</p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#32C3F2] mb-3">{mago.showDeluxNombre}:</h4>
                  <ul className="text-white list-disc list-inside space-y-2 mb-4">
                    <li>{mago.showDeluxDuracion}</li>
                    <li>{mago.showDeluxRutinas}</li>
                    <li>{mago.showDeluxEscenografia}</li>
                    <li>{mago.showDeluxPaloma}</li>
                  </ul>
                  <p className="text-[#32C3F2] font-bold">Precio {mago.showDeluxPrecio}</p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden h-full">
                <Image
                  src={`/images/magos/${nombreMago}/show.jpg`}
                  alt={`Show de ${mago.nombre}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sección Galería */}
      <section className="mb-16">
        <div className="rounded-lg p-6 shadow-lg">
          <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((num) => (
              <div key={num} className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={`/images/magos/${nombreMago}/gallery-${num}.jpg`}
                  alt={`Galería ${mago.nombre} ${num}`}
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
        nombre={mago.nombre}
        email={mago.email || ''}
        telefono={mago.telefono || ''}
        whatsapp={mago.whatsapp || ''}
        redesSociales={mago.redesSociales}
      />
    </main>
  );
} 