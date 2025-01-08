import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

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

export class Category {
  categoryId: Uuid;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;

  //used by db rehydration
  constructor(props: CategoryConstructorProps) {
    this.categoryId = props.categoryId ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  //factory method
  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  toJson() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}
