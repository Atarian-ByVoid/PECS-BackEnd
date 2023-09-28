import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { InjectAwsService } from 'nest-aws-sdk';
import { extname } from 'path';

@Injectable()
export class BucketService {
  constructor(@InjectAwsService(S3) private readonly s3Service: S3) {}

  async upload(params: PutObjectRequest) {
    return await this.s3Service.upload(params).promise();
  }
  
  async delete(params: S3.Types.DeleteObjectRequest) {
    return await this.s3Service.deleteObject(params, null).promise();
  }

  async getPublicUrl(Bucket: string, Key: string, Expires: number) {
    return await this.s3Service.getSignedUrlPromise('getObject', {
      Bucket,
      Key,
      Expires,
    });
  }
}

