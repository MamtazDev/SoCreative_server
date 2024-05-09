const nodemailer = require('nodemailer');

const emailSender = (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.sendMail(
    {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    },
    (error) => {
      if (error) {
        console.log(error);
      } else {
        return true;
      }
    }
  );
};

module.exports = { emailSender };
