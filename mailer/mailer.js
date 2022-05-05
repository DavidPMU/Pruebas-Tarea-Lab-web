const nodemailer = require('nodemailer')

const mailConfig = {
    host: '',
    port: 0,
    auth: {
        user: '',
        pass: ''
    }
}

module.exports = nodemailer.createTransport(mailConfig)
