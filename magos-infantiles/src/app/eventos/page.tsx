'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EventosPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/noticias');
  }, [router]);

  return (
    <div className="min-h-screen pt-20 pb-12 flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#32C3F2] mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirigiendo a eventos...</p>
        </div>
      </div>
    </div>
  );
} 