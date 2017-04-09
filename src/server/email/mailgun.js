import mailgun from 'mailgun-js';
import config from '../config';
import * as templates from './templates';

const AUTH = {
    apiKey: 'key-35345215e7d7ddf3a52b5abeb3deeb24',
    domain: 'mailgun.raptureready.tv',
    user: 'no.reply@mailgun.raptureready.tv'
};

const client = mailgun({ apiKey: AUTH.apiKey, domain: AUTH.domain });

export function sendForgotPasswordEmail ({email, forgotPasswordToken}, cb) {
  const mailOptions = templates.forgotEmail(AUTH.user, email, forgotPasswordToken);

  client.messages().send(mailOptions, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message %s sent: %s', body.id, body.message);
    }

    cb();
  });
}


export function sendValidationEmail ({email, validationToken}, cb) {
  const mailOptions = templates.validationEmail(AUTH.user, email, validationToken);

  client.messages().send(mailOptions, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message %s sent: %s', body.id, body.message);
    }

    cb();
  });
}
