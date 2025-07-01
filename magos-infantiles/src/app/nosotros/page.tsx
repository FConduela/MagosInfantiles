'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function NosotrosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F23]">
      {/* Hero Section */}
      <section className="relative h-[calc(60vh+10rem)] w-full">
        <div className="absolute inset-0">
          <Image
            src="/images/mi-teatro2.jpg"
            alt="Nuestro Equipo"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0A0F23]/50"></div>
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Creando momentos mágicos e inolvidables para los más pequeños
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Historia Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#32C3F2] mb-6">Quiénes Somos</h2>
              <p className="text-white text-lg mb-4">
                Somos una agrupación de magos profesionales formada en 2015, unidos por el amor y la pasión por el bello arte de la ilusión. Nuestro equipo está conformado por magos de distintas regiones del país, quienes nos hemos especializado en la magia infantil. Nuestro objetivo es perfeccionar nuestras técnicas, crear nuevas rutinas, desarrollar ideas innovadoras, estudiar la psicología infantil y aplicar todo este conocimiento en cada show que ofrecemos.
              </p>
              <p className="text-white text-lg mb-4">
                Realizamos reuniones periódicas donde trabajamos en cada detalle: desde las ilusiones y juegos hasta los elementos del show, la puesta en escena y el vocabulario. Este compromiso con la excelencia nos permite ofrecer espectáculos de primer nivel.
              </p>
              <p className="text-white text-lg">
                Te invitamos a conocernos y a dejarte sorprender por nuestra magia.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/mi-reunion.jpg"
                alt="Nuestra Historia"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Objetivos Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#32C3F2] mb-12 text-center">Objetivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#32C3F2]/20">
              <div className="text-[#32C3F2] text-4xl mb-4 text-center">📚</div>
              <h3 className="text-xl font-bold text-[#32C3F2] mb-3 text-center">Estudio</h3>
              <p className="text-white text-center">
                Estudiar la magia infantil y a los niños para saber cómo realizar un show sin perder la atención y la diversión de nuestros pequeños espectadores.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#32C3F2]/20">
              <div className="text-[#32C3F2] text-4xl mb-4 text-center">🚀</div>
              <h3 className="text-xl font-bold text-[#32C3F2] mb-3 text-center">Impulso</h3>
              <p className="text-white text-center">
                Impulsar la magia infantil como rama del ilusionismo, otorgándole la importancia y dedicación que merece, y reconociendo la relevancia de ofrecer un show de calidad para los niños.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-[#32C3F2]/20">
              <div className="text-[#32C3F2] text-4xl mb-4 text-center">🌍</div>
              <h3 className="text-xl font-bold text-[#32C3F2] mb-3 text-center">Masificación</h3>
              <p className="text-white text-center">
                Llevar la magia infantil a cada rincón, visibilizando este arte y entregando momentos memorables en cada presentación.
              </p>
            </div>
          </div>
        </section>

        {/* Directiva Section */}
        <section className="py-16 bg-gradient-to-b from-[#0A0F23] to-[#1a237e]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#32C3F2] mb-12 text-center">
              Nuestra Directiva
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Presidente - Twister */}
              <Link href="/magos/twister-2025" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 block cursor-pointer">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#32C3F2]/20">
                  <Image
                    src="/images/magos/twister-2025/carousel-1.jpg"
                    alt="Twister - Presidente"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#32C3F2] text-center mb-2">
                  Twister
                </h3>
                <p className="text-white/80 text-center text-lg">
                  Presidente
                </p>
              </Link>

              {/* Tesorero - Barba Azul */}
              <Link href="/magos/barba-azul-2025" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 block cursor-pointer">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#32C3F2]/20">
                  <Image
                    src="/images/magos/barba-azul-2025/carousel-1.jpg"
                    alt="Barba Azul - Tesorero"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#32C3F2] text-center mb-2">
                  Barba Azul
                </h3>
                <p className="text-white/80 text-center text-lg">
                  Tesorero
                </p>
              </Link>

              {/* Secretario - Kaiser */}
              <Link href="/magos/kaiser-2025" className="bg-white/5 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 block cursor-pointer">
                <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#32C3F2]/20">
                  <Image
                    src="/images/magos/kaiser-2025/carousel-1.jpg"
                    alt="Kaiser - Secretario"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#32C3F2] text-center mb-2">
                  Kaiser
                </h3>
                <p className="text-white/80 text-center text-lg">
                  Secretario
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 