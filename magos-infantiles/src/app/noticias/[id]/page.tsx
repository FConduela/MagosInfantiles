'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string | null;
  fecha: string;
  hora: string;
  lugar: string;
  destacada: boolean;
  autor_id: number;
}

const API_URL = 'http://localhost:3001/api';

export default function NoticiaDetalle() {
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/noticias/${id}`, {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setNoticia(data);
      } catch (err) {
        console.error('Error detallado:', err);
        if (err instanceof Error) {
          setError(`Error al cargar la noticia: ${err.message}`);
        } else {
          setError('Error al cargar la noticia. Por favor, intenta de nuevo más tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_URL}/noticias/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la noticia');
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la noticia');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/noticias/editar/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32C3F2] mx-auto"></div>
            <p className="mt-4 text-white">Cargando noticia...</p>
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
              onClick={() => router.back()}
              className="mt-4 bg-[#32C3F2] text-white px-4 py-2 rounded-md hover:bg-[#2BA3D2] transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white">Noticia no encontrada</p>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-[#32C3F2] text-white px-4 py-2 rounded-md hover:bg-[#2BA3D2] transition-colors"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-[#0A0F23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#32C3F2] hover:text-[#1A6AC9] transition-colors"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>

          <div className="flex gap-4">
            {(isAuthenticated && (user?.role === 'admin' || (user?.role === 'editor' && noticia?.autor_id === user.id))) && (
              <button
                onClick={handleEdit}
                className="flex items-center text-[#32C3F2] hover:text-[#1A6AC9] transition-colors"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar Noticia
              </button>
            )}

            {isAuthenticated && user?.role === 'admin' && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center text-red-500 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isDeleting ? 'Eliminando...' : 'Eliminar Noticia'}
              </button>
            )}
          </div>
        </div>

        <article className="space-y-8">
          {/* Imagen */}
          {noticia.imagen && (
            <div className="w-full">
              <Image
                src={`http://localhost:3001/uploads/noticias/${noticia.imagen}`}
                alt={noticia.titulo}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          )}

          {/* Título */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#32C3F2]">{noticia.titulo}</h1>
          </div>

          {/* Información del evento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="h-6 w-6 mr-3 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-[#32C3F2]">Fecha</h2>
              </div>
              <p className="text-white/90">
                {new Date(noticia.fecha).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
              </p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="h-6 w-6 mr-3 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-[#32C3F2]">Hora</h2>
              </div>
              <p className="text-white/90">{noticia.hora}</p>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="h-6 w-6 mr-3 text-[#32C3F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-[#32C3F2]">Lugar</h2>
              </div>
              <p className="text-white/90">{noticia.lugar}</p>
            </div>
          </div>

          {/* Contenido */}
          <div className="bg-white/5 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-[#32C3F2] mb-4">Descripción</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                {noticia.contenido}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 