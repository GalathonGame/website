const nodeMailer = require('nodemailer')

//Change this email to the organization's one
const adminEmail = "kakakakaa772@gmail.com"
const adminPassword = "danhtai123"

const mailHost = 'smtp.gmail.com'
const mailPort = 587

const sendMail = (email) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false,
        auth: {
            user: adminEmail,
            pass: adminPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: adminEmail,
        to: email,
        subject: 'Welcome to Galathon',
        html: "<h4>Thanks for allowing us to inform you the latest information about Galathon's games</h4>"
    }

    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}