var nodemailer = require('nodemailer');
const _ = require('underscore');
const fs = require('fs');

const transport = {
  host: 'smtp.office365.com',
  port: '587',
  auth: { user: 'your account', pass: 'your password' },
  secureConnection: false,
  tls: { ciphers: 'SSLv3' }
}
const from = "your account";

const getHtml = (templateName, data) => {

  let templatePath = `${templateName}.html`;
  let templateContent = fs.readFileSync(templatePath, 'utf8');
  return _.template(templateContent, data, {
    interpolate: /\{\{(.+?)\}\}/g
  });
};

const sendMailer = (to, subject, template) => {

  var transporter = nodemailer.createTransport(transport);

  const mailOptions = {
    from: from,
    to: to, subject: subject,
    html: "<h1>Test email </h1>"
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

const start = async () => {
  try {
    sendMailer("to", "Test email", "template")
  } catch (e) {
    console.error(e)
  }
}

start()