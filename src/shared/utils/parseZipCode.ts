type FuncType = (zipcode: string) => number;

export const parseZipCode: FuncType = zipcode =>
  Number(zipcode?.replace(/[^0-9]/g, ''));
