import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAverageService } from '@modules/average/services/average';

export default class AverageController {
  public static async calculate(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const getAverage = container.resolve(GetAverageService);
    const { firstValue, secondValue } = req.params;

    const average = await getAverage.execute({
      firstValue: Number(firstValue),
      secondValue: Number(secondValue),
    });

    return res.json(average);
  }
}
