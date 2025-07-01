interface MagoInfoProps {
  nombre: string;
  descripcion: string;
  especialidad: string[];
}

export default function MagoInfo({ nombre, descripcion, especialidad }: MagoInfoProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-[#32C3F2] mb-6 text-center">Sobre {nombre}</h2>
      <div className="bg-[#0A0F23] rounded-lg p-6 shadow-lg">
        <p className="text-white text-lg mb-4 text-center">
          {descripcion}
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#32C3F2] mb-3 text-center">Especialidades:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {especialidad.map((esp, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#32C3F2]/20 text-[#32C3F2] rounded-full text-sm font-medium hover:bg-[#32C3F2] hover:text-white transition-colors duration-300"
              >
                {esp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 