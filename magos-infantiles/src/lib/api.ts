import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Mago {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string;
  especialidad: string[];
  email: string;
  telefono: string;
  whatsapp: string;
  redesSociales: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  servicios: string[];
  
  // Campos de show
  showAsombroNombre?: string;
  showAsombroDuracion?: string;
  showAsombroRutinas?: string;
  showAsombroPrecio?: string;
  showDeluxNombre?: string;
  showDeluxDuracion?: string;
  showDeluxRutinas?: string;
  showDeluxEscenografia?: string;
  showDeluxPaloma?: string;
  showDeluxPrecio?: string;
}

async function getMago(slug: string): Promise<Mago> {
  try {
    const response = await axios.get(`${API_URL}/api/magos/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener datos del Mago ${slug}:`, error);
    throw error;
  }
}

export async function getMagoKaiser(): Promise<Mago> {
  return getMago('kaiser-2025');
}

export async function getMagoAlanfu(): Promise<Mago> {
  return getMago('alanfu-2025');
}

export async function getMagoFelipeVerel(): Promise<Mago> {
  return getMago('felipe-verel-2025');
}

export async function getMagoPepe(): Promise<Mago> {
  return getMago('pepe-2025');
}

export async function getMagoAlvaro(): Promise<Mago> {
  return getMago('alvaro-2025');
}

export async function getMagoSonyq(): Promise<Mago> {
  return getMago('sonyq-2025');
}

export async function getMagoNoble(): Promise<Mago> {
  return getMago('el-noble-mago-2025');
}

export async function getMagoTwister(): Promise<Mago> {
  return getMago('twister-2025');
}

export async function getMagoBarbaAzul(): Promise<Mago> {
  return getMago('barba-azul-2025');
}

export async function getMagoByNombre(nombre: string): Promise<Mago> {
  return getMago(nombre);
} 