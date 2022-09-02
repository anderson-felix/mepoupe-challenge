import { enumToArray } from '../enumToArray';

describe('Unit - enumToArray', () => {
  it('Should be transform a enum or object to array with the correspondent values', () => {
    {
      enum testEnum {
        a = 1,
        b = 2,
        c = 3,
      }

      const expected = [1, 2, 3];
      const value = enumToArray(testEnum);
      expect(value).toStrictEqual(expected);
    }
    {
      const testObj = {
        a: 1,
        b: 2,
        c: 3,
      };

      const expected = [1, 2, 3];
      const value = enumToArray(testObj);
      expect(value).toStrictEqual(expected);
    }
  });
});
