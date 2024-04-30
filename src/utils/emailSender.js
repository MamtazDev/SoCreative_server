const nodemailer = require('nodemailer');
const { setPasswordTemplate } = require('./emailTemplate');

const sendVerificationCode = async (properties) => {
  console.log('properties', properties);
  console.log('properties.email', properties.email);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: properties.email,
    subject: 'Set your password',
    html: setPasswordTemplate(),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return true;
    }
  });
};


module.exports = { sendVerificationCode };
