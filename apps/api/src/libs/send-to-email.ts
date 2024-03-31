import { Resend } from 'resend';

import { config } from '@/config';

export interface SendToEmailParams {
  email: string;
  subject: string;
  message: string;
}

export const sendToEmail = async ({ email, message, subject }: SendToEmailParams) => {
  const resend = new Resend(config.RESEND_API_KEY);

  resend.emails.send({
    from: 'onefolderapp@resend.dev',
    subject,
    text: message,
    to: email
  });
};
