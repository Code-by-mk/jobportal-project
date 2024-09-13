
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohitsaini9813165574@gmail.com",
    pass: "rdgr xghb idoz fieg", // Ensure these credentials are secure
  },
});

// Wrapper function to send an email
export const sendEmail = async function (mail) {
  try {
    const info = await transporter.sendMail({
      from: '"Mohit Saini" <mohitsaini9813165574@gmail.com>', // sender address
      to: mail, // list of receivers
      subject: "Email Verification", // Subject line
      text: "You are registered successfully", // plain text body
      html: "<b>You are registered successfully</b>", // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

