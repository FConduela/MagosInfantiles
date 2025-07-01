'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import NoticiaForm from '@/components/noticias/NoticiaForm';
import NoticiasPendientes from '@/components/noticias/NoticiasPendientes';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'admin') {
      router.push('/editor');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0F23] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      {/* Sección de Noticias Pendientes */}
      <div className="mb-8">
        <NoticiasPendientes />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Añadir Nueva Noticia</h2>
        <NoticiaForm />
      </div>
    </div>
  );
} 