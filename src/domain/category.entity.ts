import { Entity } from 'src/shared/domain/entity';
import { EntityValidationError } from 'src/shared/domain/validators/validation.error';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { CategoryValidatorFactory } from './category.validator';

export type CategoryConstructorProps = {
  categoryId?: Uuid;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export class Category extends Entity {
  categoryId: Uuid;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;

  //used by db rehydration
  constructor(props: CategoryConstructorProps) {
    super();
    this.categoryId = props.categoryId ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  changeName(name: string): void {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  get entityId(): Uuid {
    return this.categoryId;
  }

  toJson() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt?.toISOString(),
    };
  }

  //factory method
  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  static validate(category: Category) {
    const validator = CategoryValidatorFactory.create();

    const isValid = validator.validate(category);

    if (!isValid) {
      throw new EntityValidationError(validator.errors!);
    }
  }
}
