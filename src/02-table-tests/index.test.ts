// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 1, b: -1, action: Action.Subtract, expected: 2 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: null, b: null, action: Action.Divide, expected: null },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 6, b: 4, action: null, expected: null },
  { a: 6, b: 4, action: undefined, expected: null },
  { a: null, b: Infinity, action: null, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should make simplecalculator operations',
    ({
      a,
      b,
      action,
      expected,
    }: {
      a: number | null | unknown;
      b: number | null | unknown;
      action: Action | null | undefined;
      expected: null | number;
    }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
