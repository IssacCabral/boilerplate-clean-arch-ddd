export interface SendEmailInput {
  to: string;
  subject: string;
  html?: string;
}

// todo: levantar a questão: ports devem retornar
// erros ou não? somente quando necessário?
// chamadas externas podem falhar. Exemplo uma chamada http
// para um serviço externo. Nesse caso retornamos either com
// um erro possível?
export interface EmailSender {
  send(input: SendEmailInput): Promise<void>;
}
