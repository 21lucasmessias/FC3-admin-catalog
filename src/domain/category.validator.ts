import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Category } from './category.entity';
import { ClassValidatorFields } from './validators/class-validator-fields';

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsBoolean()
  isActive: boolean;

  constructor(props: Category) {
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
  }
}

class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(entity: Category) {
    return super.validate(new CategoryRules(entity));
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
