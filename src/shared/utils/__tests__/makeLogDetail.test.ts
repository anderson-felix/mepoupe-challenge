import { LogEnumType } from '@modules/log/interfaces';
import { makeLogDetail } from '../makeLogDetail';

describe('Unit - makeLogDetail', () => {
  it('Should make log detail based on log type', () => {
    {
      const content = {
        firstValue: 83,
        secondValue: 36,
        result: '59.50',
      };
      const expected = `Math operation: (${content.firstValue} + ${content.secondValue}) / 2 = ${content.result}`;
      const value = makeLogDetail(LogEnumType.average, content);
      expect(value).toStrictEqual(expected);
    }
    {
      const content = {
        firstValue: 10,
        secondValue: 20,
        result: '15.00',
      };
      const expected = `Math operation: (${content.firstValue} + ${content.secondValue}) / 2 = ${content.result}`;
      const value = makeLogDetail(LogEnumType.average, content);
      expect(value).toStrictEqual(expected);
    }
    {
      const content = 'http://test.example.com';
      const expected = `Service called: ${content}`;
      const value = makeLogDetail(LogEnumType.address, content);
      expect(value).toStrictEqual(expected);
    }
    {
      const content = '';
      const expected = `Service called: ${content}`;
      const value = makeLogDetail(LogEnumType.address, content);
      expect(value).toStrictEqual(expected);
    }
  });
});
