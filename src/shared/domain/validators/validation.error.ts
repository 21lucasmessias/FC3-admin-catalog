import { FieldsErrors } from './validator-fields-interface';

export class EntityValidationError extends Error {
  public errors: FieldsErrors;

  constructor(errors: FieldsErrors, message = 'Validation Error') {
    super(message);
    this.errors = errors;
  }
}
