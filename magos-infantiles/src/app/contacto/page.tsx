'use client';

import { useState } from 'react';
import axios from 'axios';

interface FormData {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export default function Contacto() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/contacto/enviar`,
        formData
      );

      if (response.data.message) {
        setSuccess(true);
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al enviar el mensaje. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#0A0F23] to-[#1a237e] min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#32C3F2] mb-12 text-center">
          Contáctanos
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-[#32C3F2]/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-[#32C3F2] font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#32C3F2]/20 text-white placeholder-white/50 focus:outline-none focus:border-[#32C3F2] focus:ring-2 focus:ring-[#32C3F2]/20 transition-colors duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#32C3F2] font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#32C3F2]/20 text-white placeholder-white/50 focus:outline-none focus:border-[#32C3F2] focus:ring-2 focus:ring-[#32C3F2]/20 transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="asunto" className="block text-[#32C3F2] font-medium mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#32C3F2]/20 text-white placeholder-white/50 focus:outline-none focus:border-[#32C3F2] focus:ring-2 focus:ring-[#32C3F2]/20 transition-colors duration-300"
                  placeholder="Asunto del mensaje"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-[#32C3F2] font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-[#32C3F2]/20 text-white placeholder-white/50 focus:outline-none focus:border-[#32C3F2] focus:ring-2 focus:ring-[#32C3F2]/20 transition-colors duration-300 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg bg-[#32C3F2] text-white font-medium transform hover:scale-105 transition-all duration-300 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#32C3F2]/90'
                  }`}
                >
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>

              {error && (
                <div className="text-red-400 text-center mt-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-400 text-center mt-4">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}
            </form>
          </div>

          {/* Información de contacto adicional */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#32C3F2]/20">
              <h3 className="text-xl font-bold text-[#32C3F2] mb-2">Email</h3>
              <a href="mailto:magosinfantiles.cl@gmail.com" className="text-white/80 hover:underline break-all">
                magosinfantiles.cl@gmail.com
              </a>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-[#32C3F2]/20">
              <h3 className="text-xl font-bold text-[#32C3F2] mb-2">Teléfono</h3>
              <a href="https://wa.me/56948695996" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:underline">
                +56 9 4869 5996
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 