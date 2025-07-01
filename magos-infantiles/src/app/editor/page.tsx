'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import NoticiaForm from '@/components/noticias/NoticiaForm';

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

export default function EditorPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'editor') {
      router.push('/auth/login');
      return;
    }

    const fetchNoticias = async () => {
      try {
        const response = await fetch(`${API_URL}/noticias`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setNoticias(data);
      } catch (err) {
        console.error('Error detallado:', err);
        if (err instanceof Error) {
          setError(`Error al cargar las noticias: ${err.message}`);
        } else {
          setError('Error al cargar las noticias. Por favor, intenta de nuevo más tarde.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, [isAuthenticated, user, router]);

  const handleImageError = (imageUrl: string) => {
    console.error(`Error al cargar la imagen: ${imageUrl}`);
    setFailedImages(prev => new Set([...prev, imageUrl]));
  };

  const getImageUrl = (imageName: string) => {
    if (!imageName) return '';
    const fileName = imageName.split('/').pop();
    return `http://localhost:3001/uploads/noticias/${fileName}`;
  };

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
    <div className="min-h-screen bg-[#0A0F23] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Editor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Aquí irán los componentes del panel de editor */}
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Gestión de Contenido</h2>
          {/* Contenido de gestión de contenido */}
        </div>
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Mis Publicaciones</h2>
          {/* Contenido de publicaciones */}
        </div>
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Perfil</h2>
          {/* Contenido del perfil */}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Añadir Nueva Noticia</h2>
        <NoticiaForm />
      </div>
    </div>
  );
} 