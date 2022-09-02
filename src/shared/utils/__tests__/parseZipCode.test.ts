import { parseZipCode } from '../parseZipCode';

describe('Unit - parseZipCode', () => {
  it('Should be remove specials characters and letters of the string and return a number', () => {
    {
      const input = '';

      const expected = 0;
      const value = parseZipCode(input);
      expect(value).toStrictEqual(expected);
    }
    {
      const input = 'asdasda';

      const expected = 0;
      const value = parseZipCode(input);
      expect(value).toStrictEqual(expected);
    }
    {
      const input = 'foo007bar';

      const expected = 0o7;
      const value = parseZipCode(input);
      expect(value).toStrictEqual(expected);
    }
    {
      const input = '14412847';

      const expected = 14412847;
      const value = parseZipCode(input);
      expect(value).toStrictEqual(expected);
    }
  });
});
