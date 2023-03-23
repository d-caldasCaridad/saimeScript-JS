// Importamos la librería nodemailer y axios
const nodemailer = require("nodemailer");
const axios = require("axios");

// Definimos las variables necesarias para el envío de correo y la verificación de la página web
const senderEmail = "tucorreo@gmail.com"; // Correo electrónico del remitente
const receiverEmail = "el correo al que le quieres enviar la notificacion"; // Correo electrónico del destinatario
const appPassword = "la contraseña de aplicacion que puede generar en gmail"; // Contraseña de aplicación generada en Gmail
const url = "https://website.com.co"; // URL de la página web que se va a verificar

// Configuramos el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: appPassword,
  },
});

// Función que verifica si la página web está en línea
async function checkWebsiteStatus() {
  try {
    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// Función que envía una notificación por correo electrónico si la página web está en línea
async function sendEmailNotification() {
  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: "Notificación: Página en línea",
    text: "La página está en línea.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado correctamente.");
  } catch (error) {
    console.log(`Error al enviar el correo electrónico: ${error}`);
  }
}

// Función principal que se encarga de ejecutar la verificación y el envío de notificación
async function main() {
  while (true) {
    const isOnline = await checkWebsiteStatus();
    if (isOnline) {
      console.log("La página está en línea.");
      await sendEmailNotification();
      break;
    } else {
      console.log("La página no está en línea. Reintentando en 1 minuto.");
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  }
}

// Iniciamos la ejecución del script
main();
    
