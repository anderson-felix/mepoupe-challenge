import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetUploadLinkService from '@shared/services/Storage/GetUploadLinkService';
import UploadService from '@modules/upload/services/upload/UploadService';
import GetFileLinkService from '@shared/services/Storage/GetFileLinkService';

export default class UploadController {
  public static async getObjectLink(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(GetFileLinkService);

    const response = await service.execute({ folder: 'test', key: req.params.key });

    return res.json(response);
  }

  public static async getUploadLink(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(GetUploadLinkService);

    const response = await service.execute({ folder: 'test', mimetype: String(req.query.mimetype) });

    return res.json(response);
  }

  public static async upload(req: Request, res: Response): Promise<any> {
    const uploadHandler = new UploadService();

    await uploadHandler.upload(req);

    return res.status(200).send();
  }

}
