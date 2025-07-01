'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Mago {
  id: number;
  nombre: string;
  descripcion: string;
  especialidad: string[];
  email: string;
  telefono: string;
  whatsapp: string;
  redesSociales: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  servicios: string[];
  slug: string;
}

// Función para separar las especialidades
const getEspecialidades = (especialidad: string | string[]): string[] => {
  // Si ya es un array, lo devolvemos directamente
  if (Array.isArray(especialidad)) {
    return especialidad.map(e => e.trim());
  }

  // Si es un string, lo procesamos
  if (typeof especialidad === 'string') {
    // Primero normalizamos los saltos de línea y espacios
    const normalized = especialidad
      .replace(/\r\n/g, '\n') // Convertir \r\n a \n
      .replace(/\r/g, '\n')   // Convertir \r a \n
      .replace(/\n+/g, '\n')  // Convertir múltiples \n a uno solo
      .trim();

    // Separamos por saltos de línea
    let especialidades = normalized.split('\n');
    
    // Si no hay saltos de línea, intentamos separar por comas
    if (especialidades.length === 1) {
      especialidades = especialidad.split(',').map(e => e.trim());
    }
    
    // Si aún no hay separación, intentamos por espacios
    if (especialidades.length === 1) {
      especialidades = especialidad.split(' ').map(e => e.trim());
    }
    
    // Filtramos elementos vacíos y eliminamos espacios extra
    return especialidades
      .filter(e => e.length > 0)
      .map(e => e.replace(/\s+/g, ' ').trim());
  }

  // Si no es ni string ni array, devolvemos un array vacío
  return [];
};

export default function MagosPage() {
  const [magos, setMagos] = useState<Mago[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMagos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/magos`);
        // Ordenar los magos por ID de manera ascendente y procesar especialidades
        const magosOrdenados = response.data
          .sort((a: Mago, b: Mago) => a.id - b.id)
          .map((mago: any) => ({
            ...mago,
            especialidad: getEspecialidades(mago.especialidad)
          }));
        setMagos(magosOrdenados);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener magos:', err);
        setError('Error al cargar los magos. Por favor, intenta de nuevo más tarde.');
        setLoading(false);
      }
    };

    fetchMagos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#0A0F23]">
        <div className="text-white text-xl">Cargando magos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-[#0A0F23]">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#32C3F2] mb-4">Nuestros Magos</h1>
          <p className="text-lg text-white">Conoce a nuestro equipo de magos profesionales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {magos.map((mago) => (
            <div
              key={mago.id}
              className="group bg-white/10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#32C3F2]/20 cursor-pointer hover:scale-105 hover:bg-white/20"
            >
              <Link
                href={`/magos/${mago.slug}`}
                className="block group"
              >
                <div className="relative h-80 w-full">
                  <Image
                    src={`/images/magos/${mago.slug}/carousel-1.jpg`}
                    alt={mago.nombre}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#32C3F2] mb-4 group-hover:text-[var(--color-naranja-vivo)] transition-colors duration-300">{mago.nombre}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mago.especialidad.map((especialidad, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#32C3F2]/20 text-[#32C3F2] rounded-full text-sm font-medium group-hover:bg-[#32C3F2] group-hover:text-white transition-colors duration-300"
                      >
                        {especialidad}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
              <div className="px-6 pb-6">
                <div className="flex space-x-4">
                  {mago.whatsapp && (
                    <a
                      href={`https://wa.me/${mago.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#32C3F2] transition-colors"
                      title="Contactar por WhatsApp"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </a>
                  )}
                  {mago.email && (
                    <a
                      href={`mailto:${mago.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#32C3F2] transition-colors"
                      title="Enviar correo"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </a>
                  )}
                  {mago.redesSociales.instagram && (
                    <a
                      href={`https://instagram.com/${mago.redesSociales.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#32C3F2] transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {mago.redesSociales.facebook && (
                    <a
                      href={`https://facebook.com/${mago.redesSociales.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#32C3F2] transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {mago.redesSociales.youtube && (
                    <a
                      href={`https://youtube.com/${mago.redesSociales.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#32C3F2] transition-colors"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 