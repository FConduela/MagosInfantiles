import Image from 'next/image';

interface GaleriaSectionProps {
  nombre: string;
  cantidadImagenes: number;
}

export default function GaleriaSection({ nombre, cantidadImagenes }: GaleriaSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#32C3F2] mb-6">Galería</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: cantidadImagenes }, (_, i) => i + 1).map((num) => (
          <div key={num} className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src={`/images/${nombre.toLowerCase()}-gallery-${num}.jpg`}
              alt={`Galería ${nombre} ${num}`}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
} 