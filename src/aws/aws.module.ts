import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, SES, SNS } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { BucketService } from './bucket/bucket.service';
import { ProducerService } from './producer/producer.service';

@Global()
@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          region: configService.getOrThrow('AWS_REGION'),
          credentials: {
            accessKeyId: configService.getOrThrow('AWS_AKI'),
            secretAccessKey: configService.getOrThrow('AWS_SAK'),
          },
        }),
      },
      services: [SES, SNS, S3],
    }),
  ],
  providers: [ProducerService, BucketService],
  exports: [ProducerService, BucketService],
})
export class AWSModule {}
