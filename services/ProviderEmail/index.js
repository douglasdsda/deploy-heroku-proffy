"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendMail;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transport = _nodemailer.default.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendMail(receiverMail, token) {
  const message = {
    from: process.env.MAIL_USER,
    to: receiverMail,
    subject: 'Proffy - Recuperação de senha',
    text: `Você recebeu este email para acessar o link de recuperação de sua senha no 
        Proffy. Para recuperar sua senha, acesse o link a seguir: 
        http://localhost:3000/Reset/${token}
        Não foi você? Apenas ignore este email.
        `,
    html: `
            <h2>Recuperação de senha Proffy</h2>
            <p>Você recebeu este email para acessar o link de recuperação de sua senha no 
            Proffy.</p>
            <p>Para recuperar sua senha, acesse o link abaixo:</p>
            <a 
                target="_blank"  
                href="http://localhost:3000/Reset/token/${token}"
            >Link para recuperação de senha</a> 
            
            <p>Não foi você? Apenas ignore este email.</p>
        `
  };
  console.log('transporte: ', transport);
  return transport.sendMail(message);
}