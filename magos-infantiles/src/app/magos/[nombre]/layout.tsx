import { Metadata } from 'next';

interface PageProps {
  params: {
    nombre: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Mago ${params.nombre} - Shows de Magia Infantil`,
    description: `Shows de magia infantil con el Mago ${params.nombre}. Diversión garantizada para fiestas y eventos.`,
  };
}

export default function MagoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 