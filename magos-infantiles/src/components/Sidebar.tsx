'use client';

import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const magos = [
    { nombre: 'Kaiser', ruta: '/magos/kaiser-2025' },
    { nombre: 'Twister', ruta: '/magos/twister-2025' },
    { nombre: 'Barba Azul', ruta: '/magos/barba-azul-2025' },
    { nombre: 'Alanfu', ruta: '/magos/alanfu-2025' },
    { nombre: 'Pepe', ruta: '/magos/pepe-2025' },
    { nombre: 'Alvaro', ruta: '/magos/alvaro-2025' },
    { nombre: 'Felipe Verel', ruta: '/magos/felipe-verel-2025' },
    { nombre: 'Sonyq', ruta: '/magos/sonyq-2025' },
    { nombre: 'El Noble Mago', ruta: '/magos/el-noble-mago-2025' },
  ];

  return (
    <>
      {/* Botón para mostrar/ocultar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-[#0A0F23] text-white p-2 rounded-r-lg border border-l-0 border-[#32C3F2]/20 transition-all duration-300 hover:bg-[#1A6AC9] hover:border-[#32C3F2] hover:shadow-lg ${
          isOpen ? 'translate-x-[180px]' : 'translate-x-0'
        }`}
      >
        <div className="writing-vertical-rl transform rotate-180 text-sm font-medium text-[var(--color-azul-claro)] transition-colors duration-300 group">
          <span className="group-hover:text-[var(--color-amarillo-dorado)]">NUESTROS MAGOS</span>
        </div>
      </button>

      {/* Barra lateral */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-[180px] bg-[#0A0F23] border-r border-[#32C3F2]/20 p-2 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Título de la sección */}
        <h2 className="text-xl font-bold text-[var(--color-azul-claro)] mb-2">MAGOS:</h2>

        {/* Lista de magos */}
        <nav className="space-y-0">
          {magos.map((mago) => (
            <Link
              key={mago.ruta}
              href={mago.ruta}
              className="flex items-center space-x-2 text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] py-1 px-2 rounded-lg transition-colors hover:bg-[#1A6AC9]/20"
            >
              <span className="text-base">{mago.nombre}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 