import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ClassValidatorFields } from 'src/shared/domain/validators/class-validator-fields';
import { Category } from './category.entity';

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
