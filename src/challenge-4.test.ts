import { stringify } from './challenge-4';

describe('stringify tests', () => {
  describe('from challenge 3', () => {
    test('boolean', () => {
      expect(stringify(false)).toEqual(JSON.stringify(false));
    });
    test('number int', () => {
      expect(stringify(3)).toEqual(JSON.stringify(3));
    });
    test('number float', () => {
      expect(stringify(3.14159)).toEqual(JSON.stringify(3.14159));
    });
    test('string empty', () => {
      expect(stringify("")).toEqual(JSON.stringify(""));
    });
    test('string full', () => {
      expect(stringify("lorem ipsum")).toEqual(JSON.stringify("lorem ipsum"));
    });
    test('string multiline', () => {
      expect(
        stringify(`lorem
        ipsum`)
      ).toEqual(
        JSON.stringify(`lorem
        ipsum`)
      );
    });
    test('array', () => {
      expect(stringify([
        false,
        3,
        ""
      ])).toEqual(JSON.stringify([
        false,
        3,
        ""
      ]));
    });
    test('object', () => {
      expect(stringify({
        0: false,
        "a": 3,
        "": ""
      })).toEqual(JSON.stringify({
        0: false,
        "a": 3,
        "": ""
      }));
    });
    test('nested array', () => {
      expect(stringify([
        false,
        3,
        [
          false,
          3,
          [
            false,
            3,
            "",
            [[[[[[[[[[[[]]]]]]]]]]]]
          ]
        ]
      ])).toEqual(JSON.stringify([
        false,
        3,
        [
          false,
          3,
          [
            false,
            3,
            "",
            [[[[[[[[[[[[]]]]]]]]]]]]
          ]
        ]
      ]));
    });
    test('nested object', () => {
      expect(stringify({
        0: false,
        "a": 3,
        "": {
          0: false,
          "a": 3,
          "": {
            0: false,
            "a": 3,
            "": {
              0: false,
              "a": 3,
              "": {"":{"":{"":{"":{"":[]}}}}}
            }
          }
        }
      })).toEqual(JSON.stringify({
        0: false,
        "a": 3,
        "": {
          0: false,
          "a": 3,
          "": {
            0: false,
            "a": 3,
            "": {
              0: false,
              "a": 3,
              "": {"":{"":{"":{"":{"":[]}}}}}
            }
          }
        }
      }));
    });
  })

  describe('from challenge 4', () => {
    test('undefined', () => {
      expect(() => stringify(undefined)).not.toThrow();
      expect(stringify(undefined)).toEqual('"undefined"');
    });
    test('null', () => {
      expect(() => stringify(null)).not.toThrow();
      expect(stringify(null)).toEqual('"null"');
    });
    test('Infinity', () => {
      expect(() => stringify(Infinity)).toThrow();
    });
    test('Date', () => {
      expect(() => stringify(new Date())).toThrow();
    });
    test('Map', () => {
      expect(() => stringify(new Map<boolean, boolean>())).toThrow();
    });
    test('Set', () => {
      expect(() => stringify(new Set<boolean>())).toThrow();
    });
    test('function', () => {
      expect(() => stringify(function () {})).toThrow();
    });
    test('arrow function', () => {
      expect(() => stringify(() => {})).toThrow();
    });
    test('regular expression', () => {
      expect(() => stringify(/tom rox{2,}/ig)).toThrow();
    });
    test('BigInt', () => {
      expect(() => stringify(BigInt(1234567890987654321))).toThrow();
    });
    // ... maybe you can find some other types ;)
  })
});