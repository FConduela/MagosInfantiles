import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'magosinfantiles.cl@gmail.com',
    pass: process.env.EMAIL_PASSWORD // La contraseña se debe configurar en las variables de entorno
  }
});

router.post('/enviar', async (req, res) => {
  try {
    const { nombre, email, asunto, mensaje } = req.body;

    // Validar los datos requeridos
    if (!nombre || !email || !asunto || !mensaje) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Configurar el correo
    const mailOptions = {
      from: 'magosinfantiles.cl@gmail.com',
      to: 'magosinfantiles.cl@gmail.com',
      subject: `Nuevo mensaje de contacto: ${asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el mensaje' });
  }
});

export default router; 