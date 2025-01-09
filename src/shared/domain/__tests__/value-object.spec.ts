import { ValueObject } from '../value-object';

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly value1: string, readonly value2: number) {
    super();
  }
}

describe('ValueObject', () => {
  describe('given two value objects with the same value', () => {
    let valueObject1: ValueObject;
    let valueObject2: ValueObject;

    beforeEach(() => {
      valueObject1 = new StringValueObject('teste');
      valueObject2 = new StringValueObject('teste');
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject1.equals(valueObject2);
      });

      it('then should return true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('given two value objects with different values', () => {
    let valueObject1: ValueObject;
    let valueObject2: ValueObject;

    beforeEach(() => {
      valueObject1 = new StringValueObject('teste');
      valueObject2 = new StringValueObject('test');
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject1.equals(valueObject2);
      });

      it('then should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('given two complex value object with the same values', () => {
    let valueObject1: ValueObject;
    let valueObject2: ValueObject;

    beforeEach(() => {
      valueObject1 = new ComplexValueObject('teste', 1);
      valueObject2 = new ComplexValueObject('teste', 1);
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject1.equals(valueObject2);
      });

      it('then should return true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('given two complex value object with different values', () => {
    let valueObject1: ValueObject;
    let valueObject2: ValueObject;

    beforeEach(() => {
      valueObject1 = new ComplexValueObject('teste', 1);
      valueObject2 = new ComplexValueObject('test', 2);
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject1.equals(valueObject2);
      });

      it('then should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('given two value objects with different types', () => {
    let valueObject1: ValueObject;
    let valueObject2: ValueObject;

    beforeEach(() => {
      valueObject1 = new StringValueObject('teste');
      valueObject2 = new ComplexValueObject('teste', 1);
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject1.equals(valueObject2);
      });

      it('then should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('given a value object and a null value', () => {
    let valueObject: ValueObject;

    beforeEach(() => {
      valueObject = new StringValueObject('teste');
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject.equals(null as any);
      });

      it('then should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('given a value object and an undefined value', () => {
    let valueObject: ValueObject;

    beforeEach(() => {
      valueObject = new StringValueObject('teste');
    });

    describe('when comparing them', () => {
      let result: boolean;

      beforeEach(() => {
        result = valueObject.equals(undefined as any);
      });

      it('then should return false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
