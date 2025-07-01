'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F23] shadow-lg border-b border-[#32C3F2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Logo Magos Infantiles"
                width={40}
                height={40}
                className="rounded-full"
              />
              {isAuthenticated && (
                <span className="text-2xl font-bold text-[var(--color-amarillo-dorado)]">Magos Infantiles</span>
              )}
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Inicio
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link 
                href="/admin" 
                className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin') ? 'text-[var(--color-amarillo-dorado)]' : ''
                }`}
              >
                Admin
              </Link>
            )}
            {isAuthenticated && user?.role === 'editor' && (
              <Link 
                href="/editor" 
                className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/editor') ? 'text-[var(--color-amarillo-dorado)]' : ''
                }`}
              >
                Editor
              </Link>
            )}
            <Link 
              href="/magos" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/magos') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Magos
            </Link>
            <Link 
              href="/eventos" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/eventos') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Eventos
            </Link>
            <Link 
              href="/nosotros" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/nosotros') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contacto') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Contacto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-amarillo-dorado)] hover:text-[var(--color-naranja-vivo)] focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-1/4 h-screen bg-[#0A0F23] border-l border-[#32C3F2]/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Inicio
            </Link>
            {isAuthenticated && user?.role === 'admin' && (
              <Link 
                href="/admin" 
                className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/admin') ? 'text-[var(--color-amarillo-dorado)]' : ''
                }`}
              >
                Admin
              </Link>
            )}
            {isAuthenticated && user?.role === 'editor' && (
              <Link 
                href="/editor" 
                className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/editor') ? 'text-[var(--color-amarillo-dorado)]' : ''
                }`}
              >
                Editor
              </Link>
            )}
            <Link 
              href="/magos" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/magos') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Magos
            </Link>
            <Link 
              href="/eventos" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/eventos') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Eventos
            </Link>
            <Link 
              href="/nosotros" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/nosotros') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Nosotros
            </Link>
            <Link 
              href="/contacto" 
              className={`text-[var(--color-azul-claro)] hover:text-[var(--color-amarillo-dorado)] block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/contacto') ? 'text-[var(--color-amarillo-dorado)]' : ''
              }`}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 