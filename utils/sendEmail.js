const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  let transporterOptions = null;
  if (process.env.NODE_ENV == 'production') {
    transporterOptions = {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
      },
    }
  } else {
    transporterOptions = {
      host: process.env.HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };
  }

  const transporter = nodemailer.createTransport(transporterOptions);

  const emailOptions = {
    from: process.env.GMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
