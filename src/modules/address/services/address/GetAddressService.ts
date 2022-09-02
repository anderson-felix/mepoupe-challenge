import { injectable, inject } from 'tsyringe';
import axios from 'axios';

import { LocaleError } from '@shared/errors/LocaleError';
import { IAddress } from '@modules/address/interfaces';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import { LogEnumType } from '@modules/log/interfaces';
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

  public async execute(zipCode: string): Promise<IAddress> {
    this.validateZipcode(zipCode);

    const address = await this.getAddressByZipCode(parseZipcode(zipCode));

    await this.logRepository.create({
      type: LogEnumType.address,
      content: address,
      detail: `Service called: ${BASE_URL}${zipCode}/json`,
    });

    return address;
  }

  private validateZipcode(zipCode: string): void {
    if (!zipCode) throw new LocaleError('zipcodeRequired');

    const zipcodeIsValid = !!zipCode.match(/^\d{5}-?\d{3}$/);
    if (!zipcodeIsValid) throw new LocaleError('invalidZipcode');
  }

  private async getAddressByZipCode(zipCode: number): Promise<IAddress> {
    try {
      const api = axios.create({ baseURL: BASE_URL });

      const { data } = await api.get<IAddressFullData>(`/${zipCode}/json`);

      return this.formatAddress(data);
    } catch {
      const zipCodeStr = String(zipCode);

      const readableZipCode = `${zipCodeStr.slice(0, -3)}-${zipCodeStr.slice(
        -3,
      )}`;

      throw new Error(
        `Nenhuma informação encontrada para o CEP: ${readableZipCode}`,
      );
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
