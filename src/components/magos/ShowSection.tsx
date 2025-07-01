import React from 'react';
import Image from 'next/image';

interface ShowSectionProps {
  nombre: string;
  servicios: string[];
  imagenShow: string;
}

export default function ShowSection({ nombre, servicios, imagenShow }: ShowSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#32C3F2] mb-6">Show</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#0A0F23] rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-[#32C3F2] mb-4">Magia para Todos</h3>
          <p className="text-white text-lg mb-4">
            El show de {nombre} incluye:
          </p>
          <ul className="text-white list-disc list-inside space-y-2">
            {servicios.map((servicio, index) => (
              <li key={index}>{servicio}</li>
            ))}
          </ul>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={imagenShow}
            alt={`Show de ${nombre}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
} 