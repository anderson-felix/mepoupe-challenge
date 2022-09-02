export type LocaleErrorType =
  | 'zipcodeRequired'
  | 'invalidZipcode'
  | 'invalidInput'
  | 'inputRequired'
  | 'addressNotFound';

export const localeErrorLanguage = <const>['pt', 'en'];

export type LocaleErrorLanguage = typeof localeErrorLanguage[number];

export const defaultLocaleErrorLanguage: LocaleErrorLanguage = 'pt';

export type LocaleErrorMessage = Record<LocaleErrorLanguage, string>;

export type LocaleErrorObject = {
  status: number;
  message: LocaleErrorMessage;
};

export const localeErrors: Record<LocaleErrorType, LocaleErrorObject> = {
  zipcodeRequired: {
    status: 400,
    message: {
      pt: 'Cep não informado',
      en: 'Zip code not informed',
    },
  },
  invalidZipcode: {
    status: 400,
    message: {
      pt: 'O cep informado é inválido',
      en: 'The received zipcode is invalid',
    },
  },
  invalidInput: {
    status: 400,
    message: {
      pt: 'O valor informado é inválido',
      en: 'The received value is invalid',
    },
  },
  inputRequired: {
    status: 400,
    message: {
      pt: 'Valor não informado',
      en: 'Value not informed',
    },
  },
  addressNotFound: {
    status: 403,
    message: {
      pt: 'Endereço não encontrado',
      en: 'Address not found',
    },
  },
};
