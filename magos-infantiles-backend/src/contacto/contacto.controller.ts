import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Controller('contacto')
export class ContactoController {
  @Post('enviar')
  async enviarMensaje(@Body() body: any) {
    const { nombre, email, asunto, mensaje } = body;
    if (!nombre || !email || !asunto || !mensaje) {
      throw new HttpException('Todos los campos son requeridos', HttpStatus.BAD_REQUEST);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'magosinfantiles.cl@gmail.com',
        pass: process.env.EMAIL_PASSWORD,
      },
    });

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
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Mensaje enviado con éxito' };
    } catch (error) {
      throw new HttpException('Error al enviar el mensaje', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
} 