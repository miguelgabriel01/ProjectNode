const path = require('path')
const nodemailer = require('nodemailer')

const smtpTransport = require('nodemailer-smtp-transport')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mail.json')

const transport = nodemailer.createTransport(smtpTransport({
  host, 
  port,
  auth: { user, pass }
}));

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/resources/mail/auth/'),
    layoutsDir: path.resolve('./src/resources/mail/auth/'),
    //defaultLayout: 'forgot_password.html',
    defaultLayout: null,

    
  },
  viewPath: path.resolve('./src/resources/mail/'),//resources/mail'
  extName: '.html',
};

transport.use('compile', hbs(handlebarOptions));

module.exports = transport








/*
Legal Elton, funcionou aquí. Só faltou dizer prá instalar a dependência: 

npm install nodemailer-smtp-transport --save
  */
 