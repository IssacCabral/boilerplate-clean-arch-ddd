import {
  EmailSender,
  SendEmailInput,
} from "../../../application/ports/email/email-sender.port";

export class SmtpEmailSender implements EmailSender {
  send(_input: SendEmailInput): Promise<void> {
    return Promise.resolve();
  }
}
