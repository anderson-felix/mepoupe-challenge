import { injectable, inject } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import { IAddress } from '@modules/address/interfaces';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import { LogEnumType } from '@modules/log/interfaces';
import axios from 'axios';
import { parseZipcode } from '@shared/utils';

const BASE_URL = 'https://viacep.com.br/ws/';

interface IAddressFullData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@injectable()
export class GetAddressService {
  constructor(
    @inject('LogRepository')
    private logRepository: ILogRepository,
  ) {}

  public async execute(zipcode: string): Promise<IAddress> {
    this.validateZipcode(zipcode);

    const address = await this.getAddressByZipCode(zipcode);

    await this.logRepository.create({
      type: LogEnumType.address,
      content: address,
    });

    return address;
  }

  private validateZipcode(zipcode: string): void {
    if (!zipcode) throw new LocaleError('zipcodeRequired');

    const zipcodeIsValid = !!zipcode.match(/^\d{5}-?\d{3}$/);
    if (!zipcodeIsValid) throw new LocaleError('invalidZipcode');
  }

  private async getAddressByZipCode(zipcode: string): Promise<IAddress> {
    try {
      const api = axios.create({ baseURL: BASE_URL });

      const { data } = await api.get<IAddressFullData>(`/${zipcode}/json`);

      return this.formatAddress(data);
    } catch {
      throw new LocaleError('invalidZipcode');
    }
  }

  private formatAddress(data: IAddressFullData): IAddress {
    return {
      address: data.logradouro,
      city: data.localidade,
      district: data.bairro,
      state: data.uf,
      zipcode: parseZipcode(data.cep),
    };
  }
}
