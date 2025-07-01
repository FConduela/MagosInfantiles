'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string | null;
  fecha: string;
  hora: string;
  lugar: string;
  destacada: boolean;
}

interface Mago {
  id: number;
  nombre: string;
  slug: string;
}

const API_URL = 'http://localhost:3001/api';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mostrarMas, setMostrarMas] = useState(false);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [magos, setMagos] = useState<Mago[]>([]);
  const slides = [
    { src: '/images/kaiser-carousel-1.jpg', alt: 'Mago Kaiser Show 1' },
    { src: '/images/kaiser-carousel-2.jpg', alt: 'Mago Kaiser Show 2' },
    { src: '/images/kaiser-carousel-3.jpg', alt: 'Mago Kaiser Show 3' },
  ];

  const noticiasAMostrar = mostrarMas ? noticias : noticias.slice(0, 6);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${API_URL}/noticias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setNoticias(data);
      } catch (err) {
        console.error('Error detallado:', err);
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            setError('El servidor no responde. Por favor, verifica que el backend esté corriendo.');
          } else if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
            setError('No se puede conectar con el servidor. Por favor, verifica que el backend esté corriendo en http://localhost:3001');
          } else {
            setError(`Error al cargar las noticias: ${err.message}`);
          }
        } else {
          setError('Error al cargar las noticias. Por favor, intenta de nuevo más tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  useEffect(() => {
    const fetchMagos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/magos`);
        const magosOrdenados = response.data.sort((a: Mago, b: Mago) => a.id - b.id);
        setMagos(magosOrdenados);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener magos:', err);
        setLoading(false);
      }
    };

    fetchMagos();
  }, []);

  const handleImageError = (imageUrl: string) => {
    console.error(`Error al cargar la imagen: ${imageUrl}`);
    setFailedImages(prev => new Set([...prev, imageUrl]));
  };

  const getImageUrl = (imageName: string) => {
    if (!imageName) return '';
    const fileName = imageName.split('/').pop();
    return `http://localhost:3001/uploads/noticias/${fileName}`;
  };

  const checkImageExists = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      });
      return response.ok;
    } catch (error) {
      console.error('Error al verificar imagen:', error);
      return false;
    }
  };

  useEffect(() => {
    const verifyImages = async () => {
      for (const noticia of noticias) {
        if (noticia.imagen && !failedImages.has(noticia.imagen)) {
          const imageUrl = getImageUrl(noticia.imagen);
          if (imageUrl) {
            const exists = await checkImageExists(imageUrl);
            if (!exists) {
              handleImageError(noticia.imagen);
            }
          }
        }
      }
    };

    if (noticias.length > 0) {
      verifyImages();
    }
  }, [noticias]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="relative">
      {/* Hero Section con imagen de fondo */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/images/mi-teatro1.jpg"
          alt="Magos Infantiles"
          fill
          className="object-cover w-full h-auto opacity-60"
          priority
          sizes="100vw"
        />
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-[#0A0F23]/50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Magia para tus Eventos
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                Creamos momentos mágicos e inolvidables para los más pequeños
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Noticias */}
      <section className="py-16 bg-[#0A0F23]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#32C3F2] mb-12 text-center">
            Noticias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticiasAMostrar.map((noticia) => (
              <Link 
                href={`/noticias/${noticia.id}`} 
                key={noticia.id} 
                className="bg-[#1A6AC9]/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#1A6AC9]/20 cursor-pointer"
              >
                <div className="relative h-40">
                  {noticia.imagen && !failedImages.has(noticia.imagen) && (
                    <Image
                      src={getImageUrl(noticia.imagen)}
                      alt={noticia.titulo}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(noticia.imagen!)}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#32C3F2] mb-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {noticia.contenido}
                  </p>
                  <div className="flex flex-col space-y-2 text-xs text-white/60">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(noticia.fecha).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        timeZone: 'UTC'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{noticia.hora}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-2 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{noticia.lugar}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Botón Ver Más */}
          {noticias.length > 6 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setMostrarMas(!mostrarMas)}
                className="bg-[var(--color-naranja-vivo)] hover:bg-[var(--color-amarillo-dorado)] text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                {mostrarMas ? 'Ver Menos' : 'Ver Más'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sección de Integrantes */}
      <section className="relative py-24 min-h-screen bg-gradient-to-b from-[#0A0F23] to-[#1a237e] overflow-hidden">
        {/* Fondo con efecto espacial */}
        <div className="absolute inset-0 bg-[url('/images/space-bg.jpg')] opacity-50 bg-cover bg-center"></div>
        
        <div className="container mx-auto px-4 relative">
          <h2 className="text-4xl font-bold text-[#32C3F2] mb-16 text-center">
            Nuestros Magos
          </h2>
          
          <div className="relative max-w-[1000px] mx-auto">
            {/* Logo central */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300 bg-[#00102A] flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Logo Magos Infantiles"
                  width={120}
                  height={120}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Magos en círculo */}
            {!loading && magos.map((mago, index) => {
              const angle = (index * (360 / magos.length) * Math.PI) / 180; // Mantener ángulo base
              const radius = 350; // Radio del círculo
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              // Ajustes adicionales para posiciones específicas
              let transformAdjustment = '';
              if (mago.slug === 'barba-azul') {
                transformAdjustment = 'translateX(20px)'; // Mover más a la derecha
              } else if (mago.slug === 'el-noble-mago-2025') {
                transformAdjustment = 'translateY(-20px)'; // Mover más arriba
              }
              
              return (
                <Link
                  key={mago.id}
                  href={`/magos/${mago.slug}`}
                  className="absolute w-40"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) ${transformAdjustment}`
                  }}
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={`/images/magos/${mago.slug}/carousel-1.jpg`}
                      alt={mago.nombre}
                      width={160}
                      height={160}
                      className={`object-cover w-full h-full ${
                        ['barba-azul', 'pepe', 'felipe-verel'].includes(mago.slug) 
                          ? 'object-center scale-110' 
                          : 'object-center'
                      }`}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[#32C3F2] mt-4 text-center">
                    {mago.nombre}
                  </h3>
                </Link>
              );
            })}

            {/* Contenedor espaciador para mantener el alto */}
            <div className="h-[1100px]"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
