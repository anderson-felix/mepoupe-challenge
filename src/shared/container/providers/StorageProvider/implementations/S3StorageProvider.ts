import fs from 'fs';
import AWS, { S3 } from 'aws-sdk';
//@ts-ignore
import logplease from 'logplease';
import { filenameGenerator } from '@shared/utils/filenameGenerator';
import IStorageProvider from '../models/IStorageProvider';
import {
  FileDeleteOrDuplicateParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new AWS.S3({
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
      apiVersion: '2006-03-01',
    });
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async getUploadLink({
    mimetype,
    folder,
    ACL,
  }: GetUploadLinkParams): Promise<UploadLinkResponse> {
    try {
      const key = filenameGenerator(mimetype);

      const params = {
        Bucket: `${process.env.AWS_S3_BUCKET}/${folder}`,
        Key: `${key}`,
        ACL: ACL || 'public-read',
        ContentType: mimetype,
      };
      ;
      logplease.setLogfile('debug.log');
      // Set log level
      logplease.setLogLevel('DEBUG');
      // Create logger
      const logger = logplease.create('logger name');
      // Assign logger to SDK
      AWS.config.logger = logger;
      const link = this.client.getSignedUrl('putObject', params);
      AWS.config.logger = logger;

      return { link, path: `${folder}/${key}` };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async getFileLink({
    folder,
    key,
    expires = 600,
  }: GetFileLinkParams): Promise<string> {
    try {
      const params = {
        Bucket: `${process.env.AWS_S3_BUCKET}/${folder}`,
        Key: key,
        Expires: expires,
      };

      return this.client.getSignedUrl('getObject', params);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async saveFile({
    filename,
    filePath,
    folder,
    mimetype,
    ACL,
  }: FileUploadParams): Promise<string> {
    try {
      const bucket = folder
        ? `${process.env.AWS_S3_BUCKET}/${folder}`
        : `${process.env.AWS_S3_BUCKET}`;

      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucket,
        Key: filename,
        Body: fileContent,
        ACL: ACL || 'public-read',
        ContentType: mimetype,
      };

      const data = await this.client.upload(params).promise();

      return data.Location;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      await fs.promises.unlink(filePath);
    }
  }

  public async deleteFile({
    filename,
    folder,
  }: FileDeleteOrDuplicateParams): Promise<void> {
    try {
      const bucket = folder
        ? `${process.env.AWS_S3_BUCKET}/${folder}`
        : `${process.env.AWS_S3_BUCKET}`;

      await this.client
        .deleteObject({
          Bucket: bucket,
          Key: filename,
        })
        .promise();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
