import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import { generateSecretKey, filenameGenerator } from '@shared/utils';
import IStorageProvider from '../models/IStorageProvider';
import {
  FileDeleteOrDuplicateParams,
  FileUploadParams,
  GetFileLinkParams,
  GetUploadLinkParams,
  UploadLinkResponse,
} from '../interfaces';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ filename }: FileUploadParams): Promise<string> {
    return `${process.env.APP_API_URL}/files/${filename}`;
  }

  public async deleteFile({ filename }: FileDeleteOrDuplicateParams): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, filename);
    await fs.promises.unlink(filePath);
  }

  public async getUploadLink({
    mimetype,
  }: GetUploadLinkParams): Promise<UploadLinkResponse> {
    const timestamp = Date.now();

    const key = filenameGenerator(mimetype);

    const secret = generateSecretKey(timestamp);

    const apiURL = process.env.APP_API_URL || 'http://localhost:3335';

    return {
      link: `${apiURL}/dev/upload/${secret}?filename=${key}`,
      path: `files/${key}`,
    };
  }

  public async getFileLink({ key }: GetFileLinkParams): Promise<string> {
    return `${process.env.APP_API_URL}/files/${key}`;
  }
}

export default DiskStorageProvider;
