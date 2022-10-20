import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { Request } from 'express';

import uploadConfig from '@config/upload';

export default class UploadService {
  private pipelineAsync: any;

  constructor() {
    this.pipelineAsync = promisify(pipeline);
  }

  public async upload(request: Request) {
    const filename = String(request.query.filename);
    const location = path.resolve(uploadConfig.directory, filename);

    await this.pipelineAsync(request, fs.createWriteStream(location));
  }
}
