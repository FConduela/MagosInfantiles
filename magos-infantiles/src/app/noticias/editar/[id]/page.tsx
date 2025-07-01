'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import SuccessModal from '@/components/ui/SuccessModal';

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  imagen: string | null;
  fecha: string;
  hora: string;
  lugar: string;
  estado: string;
  autor_id: number;
}

export default function EditarNoticia() {
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    fecha: '',
    hora: '',
    lugar: '',
  });

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'editor')) {
      router.push('/login');
      return;
    }

    const fetchNoticia = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/noticias/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar la noticia');
        }

        const data = await response.json();
        
        if (user?.role === 'editor' && data.autor_id !== user.id) {
          router.push('/editor');
          return;
        }

        setNoticia(data);
        setFormData({
          titulo: data.titulo,
          contenido: data.contenido,
          fecha: new Date(data.fecha).toISOString().split('T')[0],
          hora: data.hora,
          lugar: data.lugar,
        });

        if (data.imagen) {
          setPreviewUrl(`http://localhost:3001/uploads/noticias/${data.imagen}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar la noticia');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id, isAuthenticated, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (file) {
        formDataToSend.append('imagen', file);
      }

      const response = await fetch(`http://localhost:3001/api/noticias/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la noticia');
      }

      setShowSuccessModal(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la noticia');
    }
  };

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-500/10 p-4 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Editar Noticia</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-400 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-white mb-2">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="contenido" className="block text-sm font-medium text-white mb-2">
            Contenido
          </label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-white mb-2">
            Imagen
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          />
          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-white mb-2">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-white mb-2">
              Hora
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="lugar" className="block text-sm font-medium text-white mb-2">
              Lugar
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <SuccessModal
          message="Noticia actualizada exitosamente"
          onClose={() => setShowSuccessModal(false)}
          redirectPath={user?.role === 'admin' ? '/admin' : '/editor'}
        />
      )}
    </div>
  );
} 