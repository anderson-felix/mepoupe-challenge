type FuncType = (zipcode: string) => number;

export const parseZipcode: FuncType = zipcode =>
  Number(zipcode.replace(/[^0-9]/g, ''));
