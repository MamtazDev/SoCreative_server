/* eslint-disable prettier/prettier */
const nodemailer = require('nodemailer');
const config = require('../../config/config');

const transport = {
  service: 'Gmail',
  auth: {
    user: config.email.smtp.auth.user,
    pass: config.email.smtp.auth.pass,
  },
};

const sendInviteMail = async (data, token) => {
  const transporter = nodemailer.createTransport(transport);
  const mailOptions = {
    from: config.email.from,
    to: data?.email,
    subject: `Invite for Registration`,
    html: `
      <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
      <div
          style="max-width: 600px; width: 100%; margin: 0 auto; font-family: 'Cabin',sans-serif; text-align:center; background-color: #ffff;">
          <div style="width: 100%; background-color: #037d41; align-items: center; padding:30px 0px">
              <small style=" color:#ffff;">Your Verified Seller Status on so-creative </small>
              <p style=" color:#ffff; margin: 0px;     line-height: 39.2px;
      font-size: 28px;">Welcome to so-creative</p>
          </div>
          <a href="${config.client_url}/register/invite/${token}" target="_blank" style="width: fit-content;cursor:pointer"  >
          <button
              style="
      text-align:center; width: fit-content;min-width: 100px; display: block; cursor:pointer;
      padding: 14px 44px 13px;
      line-height: 120%; margin: 30px auto; background-color: #037d41 ; color:#ffff; border:none;border-radius: 5px;">Verify</button>
          </a>
          <div
              style="background-color: #d9eee4; padding:10px; font-size:14px;color:#003399;line-height:160%;text-align:center;word-wrap:break-word">
              <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Get in
                          touch</strong></span></p>
              <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000000"><a
                          href="mailto:support@so-creative.com"
                          target="_blank">support@so-creative.com</a></span>
              </p>
          </div>
          <div style="color:#ffff; background-color: #037d41; padding: 1px;">
              <p style="font-size:14px;line-height:180% ; color:#ffff">Copyrights © so-creative AB
                  All
                  Rights Reserved</p>
          </div>
      </div>
  </body>
    `,
  };

  let status = true;
  transporter.sendMail(mailOptions, (error, info) => {
    if (info) {
      status = true;
    }
    if (error) {
      status = false;
    }
  });
  return status;
};

module.exports = {
  sendInviteMail,
};
