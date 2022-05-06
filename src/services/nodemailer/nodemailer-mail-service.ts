import nodemailer from 'nodemailer';
import { MailService, SendMailData } from '../mail-service';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c47e77440c9fd8',
    pass: '86786aca53ce2a',
  },
});

export class NodemailerService implements MailService {
  async sendMail({ body, subject }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Fernando Alves <fernandoalvesq@gmail.com>',
      subject: subject,
      html: body,
    });
  }
}
