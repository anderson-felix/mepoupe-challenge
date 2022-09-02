import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAddressService } from '@modules/address/services/address';

export default class AddressController {
  public static async get(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(GetAddressService);

    const user = await createUser.execute(req.params.zipcode);

    return res.json(user);
  }
}
