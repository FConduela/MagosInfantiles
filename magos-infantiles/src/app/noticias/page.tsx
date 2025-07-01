'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

const API_URL = 'http://localhost:3001/api';

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        console.log('Intentando conectar con el backend...');
        const response = await fetch(`${API_URL}/noticias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
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
        signal: AbortSignal.timeout(2000),
      });
      return response.ok;
    } catch (error) {
      console.error('Error al verificar imagen:', error);
      return false;
    }
  };

  useEffect(() => {
    const verifyImages = async () => {
      const imageChecks = noticias
        .filter(noticia => noticia.imagen && !failedImages.has(noticia.imagen))
        .map(async (noticia) => {
          const imageUrl = getImageUrl(noticia.imagen!);
          if (imageUrl) {
            const exists = await checkImageExists(imageUrl);
            if (!exists) {
              handleImageError(noticia.imagen!);
            }
          }
        });
      
      await Promise.all(imageChecks);
    };

    if (noticias.length > 0) {
      verifyImages();
    }
  }, [noticias]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32C3F2] mx-auto"></div>
            <p className="mt-4 text-white">Cargando noticias...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#32C3F2] text-white px-4 py-2 rounded-md hover:bg-[#2BA3D2] transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#32C3F2] mb-4">Eventos y Noticias</h1>
          <p className="text-lg text-white">Mantente informado sobre nuestros eventos y novedades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <Link
              key={noticia.id}
              href={`/noticias/${noticia.id}`}
              className="bg-[#1A6AC9]/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#1A6AC9]/20 cursor-pointer"
            >
              {noticia.imagen && !failedImages.has(noticia.imagen) && (
                <div className="relative h-40">
                  <Image
                    src={getImageUrl(noticia.imagen)}
                    alt={noticia.titulo}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(noticia.imagen!)}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
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

        {noticias.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white">No hay noticias disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
} 