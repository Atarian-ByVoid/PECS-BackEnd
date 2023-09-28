import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SES, SNS } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { EmailOptions, SMSOptions } from './producer.interface';

@Injectable()
export class ProducerService {
  constructor(
    @InjectAwsService(SES) private readonly sesService: SES,
    @InjectAwsService(SNS) private readonly snsService: SNS,
  ) {}

  async sendEmail(options: EmailOptions) {
    try {
      return await this.sesService
        .sendEmail({
          Destination: {
            ToAddresses: [options.to],
            BccAddresses: ['cgomespimentel666@gmail.com', options.bcc],
          },
          Message: {
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: options.html,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: options.subject,
            },
          },
          Source: 'PECS <cgomespimentel666@gmail.com>',
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException('Erro ao enviar o e-mail.');
    }
  }

  sendSMS(options: SMSOptions) {
    try {
      return this.snsService
        .publish({
          PhoneNumber: options.to,
          Message: `PECS: ${options.message}`,
        })
        .promise();
    } catch (e) {
      throw new InternalServerErrorException('Erro ao enviar o SMS.');
    }
  }
}
