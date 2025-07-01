'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NoticiaFormData {
  titulo: string;
  contenido: string;
  fecha: string;
  hora: string;
  lugar: string;
  imagen: File | null;
}

export default function NoticiaForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<NoticiaFormData>({
    titulo: '',
    contenido: '',
    fecha: '',
    hora: '',
    lugar: '',
    imagen: null
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Crear URL para la vista previa
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Limpiar la URL de vista previa cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

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

      const response = await fetch('http://localhost:3001/api/noticias', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Error al crear la noticia');
      }

      setSuccess('Noticia creada exitosamente');
      setFormData({
        titulo: '',
        contenido: '',
        fecha: '',
        hora: '',
        lugar: '',
        imagen: null
      });
      setFile(null);
      setPreviewUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la noticia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#0A0F23] mb-6">Añadir Nueva Noticia</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32C3F2] focus:ring-[#32C3F2] text-gray-900"
            placeholder="Ingresa el título de la noticia"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32C3F2] focus:ring-[#32C3F2] text-gray-900"
            placeholder="Ingresa el contenido de la noticia"
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32C3F2] focus:ring-[#32C3F2] text-gray-900"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700">
              Hora
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32C3F2] focus:ring-[#32C3F2] text-gray-900"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">
              Lugar
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={formData.lugar}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#32C3F2] focus:ring-[#32C3F2] text-gray-900"
              placeholder="Ingresa el lugar del evento"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <label 
              htmlFor="imagen" 
              className="w-full max-w-xs flex flex-col items-center px-4 py-6 bg-white text-[#32C3F2] rounded-lg shadow-lg tracking-wide border border-[#32C3F2] cursor-pointer hover:bg-[#32C3F2] hover:text-white transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base">Seleccionar imagen</span>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
            {previewUrl && (
              <div className="relative w-full max-w-xs h-[104px]">
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#32C3F2] text-white px-4 py-2 rounded-md hover:bg-[#1A6AC9] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creando...' : 'Crear Noticia'}
          </button>
        </div>
      </form>
    </div>
  );
} 