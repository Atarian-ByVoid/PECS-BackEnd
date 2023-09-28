export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  bcc?: string;
}

export interface SMSOptions {
  to: string;
  message: string;
}
