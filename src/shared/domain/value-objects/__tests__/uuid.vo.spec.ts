import { v4 as uuidv4 } from 'uuid';
import { InvalidUuidError, Uuid } from '../uuid.vo';

describe('UUID', () => {
  let validateSpy: any;

  beforeEach(() => {
    jest.clearAllMocks();
    validateSpy = jest.spyOn(Uuid.prototype as any, 'validate');
  });

  describe('given a valid uuid', () => {
    const id = uuidv4();

    describe('when creating a new UUID', () => {
      let uuid: Uuid;

      beforeEach(() => {
        uuid = new Uuid(id);
      });

      test('then should create a new UUID', () => {
        expect(uuid).toBeDefined();
        expect(uuid.id).toBeDefined();
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('given an empty id', () => {
    describe('when creating a new UUID', () => {
      test('then should create a new UUID', () => {
        const uuid = new Uuid();

        expect(uuid).toBeDefined();
        expect(uuid.id).toBeDefined();
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('given an invalid id', () => {
    const invalidId = 'invalid-uuid';

    describe('when creating a new UUID', () => {
      test('then should throw an error', () => {
        expect(() => new Uuid(invalidId)).toThrow(InvalidUuidError);
        expect(validateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
