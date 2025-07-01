import React from 'react';

interface GaleriaSectionProps {
  nombre: string;
  cantidadImagenes: number;
}

export default function GaleriaSection({ nombre, cantidadImagenes }: GaleriaSectionProps) {
  // Generar un array con la cantidad de imágenes disponibles
  const imagenes = Array.from({ length: cantidadImagenes }, (_, index) => index + 1);

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#32C3F2] mb-6">Galería</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {imagenes.map((numero) => (
          <div key={numero} className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src={`/images/magos/${nombre}/gallery-${numero}.jpg`}
              alt={`Galería ${nombre} ${numero}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
} 