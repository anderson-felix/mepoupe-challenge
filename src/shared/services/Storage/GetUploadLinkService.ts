import { injectable, inject } from 'tsyringe';
import mime from 'mime-types';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import {
  GetUploadLinkParams,
  UploadLinkResponse,
} from '@shared/container/providers/StorageProvider/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import { SERVICE_TYPE } from '@shared/adapters/interfaces';
import { makeHttpProvider } from '@shared/adapters';

@injectable()
export default class GetUploadLinkService {
  private provider: IStorageProvider;
  constructor() {
    this.provider = makeHttpProvider('aws', { objetive: 'Obter link de upload', serviceType: SERVICE_TYPE.AWS })

  }

  public async execute(data: GetUploadLinkParams): Promise<UploadLinkResponse> {
    const extension = mime.extension(data.mimetype);
    if (!extension) throw new LocaleError('invalidFileType');

    return await this.provider.getUploadLink(data);
  }
}
