// utils/sendEmail.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTurnoEmail = async (user) => {
  try {
    await resend.emails.send({
      from: 'Consultorio Dental <onboarding@resend.dev>', // puedes cambiar el remitente
      to: 'jhessle04@gmail.com', // acá el mail del odontólogo o quien reciba notificación
      subject: `Nuevo turno reservado - ${user.nombre}`,
      html: `
        <h2>Nuevo turno reservado desde WhatsApp</h2>
        <p><strong>Paciente:</strong> ${user.nombre}</p>
        <p><strong>Teléfono:</strong> <a href="https://wa.me/${user.telefono}">+${user.telefono}</a></p>
        <p><strong>Fecha:</strong> ${user.turno.fecha}</p>
        <p><strong>Hora:</strong> ${user.turno.hora}</p>
        <p><strong>Motivo:</strong> ${user.turno.motivo}</p>
        <p><em>${new Date().toLocaleString('es-AR')}</em></p>
        <br>
        <a href="https://wa.me/${user.telefono}?text=Hola%20${encodeURIComponent(user.nombre.split(' ')[0])}%20gracias%20por%20reservar%20tu%20turno"
           style="background:#25d366;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
           Contactar por WhatsApp
        </a>
      `
    });

    console.log('Email de turno enviado:', user.nombre);
  } catch (error) {
    console.error('Error enviando email de turno:', error.message);
  }
};
