const mailer = require('nodemailer');

const transport = mailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = {
  send: async (to, text) => {
    const result = await transport.sendMail({
      from: '"건식이" <help@gunsigi.com>',
      to,
      subject: 'hello',
      html: `<b>${text}</b>`,
    });
    return result;
  },
};
