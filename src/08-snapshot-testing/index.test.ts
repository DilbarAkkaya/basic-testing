// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = ['a', 'b', 1, []];
  const linkedList = {
    value: 'a',
    next: {
      value: 'b',
      next: {
        value: 1,
        next: {
          value: [],
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };

  const elementsSnap = [1, 2, [], { a: 'b' }];

  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(linkedList);
  });
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elementsSnap)).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": {
                "next": null,
                "value": null,
              },
              "value": {
                "a": "b",
              },
            },
            "value": [],
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
