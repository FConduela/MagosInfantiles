'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string | null;
  fecha: string;
  hora: string;
  lugar: string;
  estado: string;
}

export default function NoticiasPendientes() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const fetchNoticiasPendientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log('Token:', token);
      console.log('User:', user);
      
      if (!token) {
        console.error('No hay token disponible');
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:3001/api/noticias/pendientes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.status === 401 || response.status === 403) {
        console.error('Error de autenticación:', response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error data:', errorData);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar las noticias pendientes');
      }

      const data = await response.json();
      setNoticias(data);
    } catch (err) {
      console.error('Error completo:', err); // Para debugging
      setError(err instanceof Error ? err.message : 'Error al cargar las noticias');
    } finally {
      setLoading(false);
    }
  };

  const handleAprobar = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/noticias/${id}/aprobar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al aprobar la noticia');
      }

      // Actualizar la lista de noticias pendientes
      fetchNoticiasPendientes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al aprobar la noticia');
    }
  };

  const handleRechazar = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/noticias/${id}/rechazar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al rechazar la noticia');
      }

      // Actualizar la lista de noticias pendientes
      fetchNoticiasPendientes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al rechazar la noticia');
    }
  };

  const handleEditar = (id: number) => {
    router.push(`/noticias/editar/${id}`);
  };

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      console.log('Usuario no autenticado o no es admin:', { isAuthenticated, user }); // Para debugging
      router.push('/login');
      return;
    }
    fetchNoticiasPendientes();
  }, [isAuthenticated, user, router]);

  if (loading) {
    return <div className="text-white">Cargando noticias pendientes...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 p-4 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Noticias Pendientes</h2>
      {noticias.length === 0 ? (
        <div className="bg-white/5 p-8 rounded-lg text-center">
          <div className="text-4xl mb-4">📰</div>
          <p className="text-xl text-white mb-2">No hay noticias pendientes</p>
          <p className="text-gray-400">Todas las noticias han sido revisadas y procesadas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="bg-[#1A6AC9]/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {noticia.imagen && (
                <div className="relative h-40">
                  <img
                    src={`http://localhost:3001/uploads/noticias/${noticia.imagen}`}
                    alt={noticia.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#32C3F2] mb-2">{noticia.titulo}</h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">{noticia.contenido}</p>
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
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleEditar(noticia.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleAprobar(noticia.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleRechazar(noticia.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 