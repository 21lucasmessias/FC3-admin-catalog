import { ClassValidatorFields } from 'src/shared/domain/validators/class-validator-fields';
import { EntityValidationError } from 'src/shared/domain/validators/validation.error';
import { FieldsErrors } from 'src/shared/domain/validators/validator-fields-interface';

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.errors, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
      }

      return assertContainsErrorsMessages(validator.errors!, received);
    }
  },
});

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(received, null, 2)}. \nCurrent: ${JSON.stringify(
            expected,
            null,
            2,
          )}`,
      };
}

function isValid() {
  return { pass: true, message: () => '' };
}
