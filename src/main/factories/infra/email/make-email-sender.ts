import { EmailSender } from "../../../../application/ports/email/email-sender.port";
import { SmtpEmailSender } from "../../../../infra/adapters/email/smtp-email-sender.adapter";

export function makeEmailSender(): EmailSender {
  return new SmtpEmailSender();
}
