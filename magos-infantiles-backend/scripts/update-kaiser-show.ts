import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function updateKaiserShow() {
  try {
    // Buscar el mago Kaiser por su slug
    const magoKaiser = await prisma.mago.findUnique({
      where: {
        slug: 'kaiser-2025'
      }
    });

    if (!magoKaiser) {
      console.log('No se encontró el mago Kaiser');
      return;
    }

    // Actualizar la información del show con el texto hardcodeado actual
    const updatedMago = await prisma.mago.update({
      where: {
        id: magoKaiser.id
      },
      data: {
        // Show Asombro y Risas
        showAsombroNombre: "SHOW ASOMBRO Y RISAS",
        showAsombroDuracion: "30 - 35 min. de magia y risas garantizadas",
        showAsombroRutinas: "5 Rutinas mágicas interactivas para pequeños y grandes",
        showAsombroPrecio: "$110.000",
        
        // Show Delux
        showDeluxNombre: "SHOW DELUX",
        showDeluxDuracion: "40 - 45 min. de magia y risas garantizadas",
        showDeluxRutinas: "7 Rutinas mágicas interactivas para pequeños y grandes",
        showDeluxEscenografia: "Escenografía y amplificación para una experiencia mágica más completa",
        showDeluxPaloma: "Aparición de paloma real 🕊",
        showDeluxPrecio: "$130.000"
      }
    });

    console.log('✅ Información del show del mago Kaiser actualizada exitosamente:');
    console.log('Mago:', updatedMago.nombre);
    console.log('Show Asombro:', updatedMago.showAsombroNombre);
    console.log('Show Delux:', updatedMago.showDeluxNombre);

  } catch (error) {
    console.error('❌ Error al actualizar la información del show:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateKaiserShow(); 