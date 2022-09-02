import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListLogsService } from '@modules/log/services/log';

export default class LogController {
  public static async list(req: Request, res: Response): Promise<Response> {
    const listLogs = container.resolve(ListLogsService);

    const logs = await listLogs.execute(req.paging);

    return res.json(logs);
  }
}
