import nodemailer from 'nodemailer';
import config from './config';

const AUTH = {
  user: 'noreply.eternityready@gmail.com',
  pass: 'eternityready123#'
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: AUTH
});


export function sendForgotPasswordEmail ({email, forgotPasswordToken}, cb) {
  // setup email data with unicode symbols

  const url = `${config.WEPAPP_URI}/forgot-password/${forgotPasswordToken}`;
  const html = `
     Hi!<br>
     You recently requested to reset your password for your account.
     Click here to reset it: <br /><a href="${url}">${url}</a><br />
     If you did not request a password reset, please ignore this email `;

  const mailOptions = {
    from: AUTH.user, // sender address
    to: email, // list of receivers
    subject: `Reset Password`, // Subject line
    html: html
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }

    cb();
  });
}

export function sendValidationEmail ({email, validationToken}, cb) {

  const url = `${config.WEPAPP_URI}/api/user/validate?token=${validationToken}`;
  const html = `
        Hi!<br/>
        Thanks for registering. To activate your email address click the link below!
        <br/><br/>
        Activation Link: <a href='${url}'>${url}</a>;`;

  const mailOptions = {
    from: AUTH.user, // sender address
    to: email, // list of receivers
    subject: `Registration`, // Subject line
    html: html
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }

    cb();
  });
}
