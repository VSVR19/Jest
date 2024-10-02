jest.mock('../../app/doubles/OtherUtils', () => ({
  ...jest.requireActual('../../app/doubles/OtherUtils'),
  calculateStringComplexity: () => { return 10 }
}));

jest.mock('uuid', () => ({
  v4: () => '123'
}));

import * as OtherUtils from '../../app/doubles/OtherUtils';
import { StringInfo } from '../../app/doubles/OtherUtils';

describe('Mocking the entire OtherUtils file', () => {
  it('calculate complexity', () => {
    // const result = OtherUtils.calculateStringComplexity({} as any);
    const result = OtherUtils.calculateStringComplexity({} as StringInfo);
    expect(result).toBe(10);
  });

  it('converts the string to its equivalent uppercase version', () => {
    const result = OtherUtils.toUpperCase('blah');
    expect(result).toBe('BLAH')
  });

  it('method that returns a string along with UUID V4', () => {
    const result = OtherUtils.toLowerCaseWithId('BLUH');
    expect(result).toBe(`bluh123`);
  });
});
