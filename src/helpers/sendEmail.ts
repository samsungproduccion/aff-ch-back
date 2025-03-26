import nodemailer from 'nodemailer';
import { emailSender } from '../interfaces/emails';

export const sendEmail = async ({template, emailTitle , emailReciever, emailSubject, withCopy=[], withHiddenCopy=[], attachments=[]}: emailSender) => {
  // console.log({user: process.env.AWS_MAIL_PASS, pass: process.env.AWS_MAIL_USER})
  const fromEmail = process.env.AWS_MAIL_FROM;
  // console.log(`${emailTitle} <${fromEmail}>`)
  const transporter = nodemailer.createTransport({
    host: process.env.AWS_MAIL_SMTP,
    auth:{
      user: process.env.AWS_MAIL_USER,
      pass: process.env.AWS_MAIL_PASS
    },
  })


  // console.log(path.join(__dirname, '../output/000000010.pdf'))
  try {

    await transporter.sendMail({
      from: `${emailTitle} <${fromEmail}>`, // sender address
      to: emailReciever, // list of receivers
      subject: emailSubject, // Subject line
      cc: withCopy,
      bcc: withHiddenCopy,
      html: template, // html body
      attachments,
      list: {
        unsubscribe: 'none',
    }
    });
  } catch (error) {
    console.log(error)
  }

 
}
