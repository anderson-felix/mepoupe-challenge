import { injectable, inject } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import { IAddress } from '@modules/address/interfaces';
import ILogRepository from '@modules/log/repositories/ILogRepository';
import { LogEnumType } from '@modules/log/interfaces';
import { parseZipCode, makeLogDetail } from '@shared/utils';
import { AxiosAdapter } from '@shared/adapters';

const BASE_URL = 'https://viacep.com.br/ws';


export interface IAddressFullData {
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
  ) { }

  public async execute(zipCode: string): Promise<IAddress> {
    this.validateZipcode(zipCode);

    const address = await this.getAddressByZipCode(parseZipCode(zipCode));

    await this.logRepository.create({
      type: LogEnumType.address,
      content: address,
      detail: makeLogDetail(LogEnumType.address, `${BASE_URL}${zipCode}/json`),
    });

    return address;
  }

  private validateZipcode(zipCode: string): void {
    if (!zipCode) throw new LocaleError('zipcodeRequired');

    const zipcodeIsValid = !!zipCode.match(/^\d{5}-?\d{3}$/);

    if (!zipcodeIsValid) throw new LocaleError('invalidZipcode');
  }

  private async getAddressByZipCode(zipCode: number): Promise<IAddress> {

    const api = new AxiosAdapter(BASE_URL).provider
    const { data } = await api.get<IAddressFullData>(`/${zipCode}/json`);

    return this.formatAddress(data);
  }

  private formatAddress(data: IAddressFullData): IAddress {
    return {
      address: data.logradouro,
      city: data.localidade,
      district: data.bairro,
      state: data.uf,
      zipcode: parseZipCode(data.cep),
    };
  }
}
