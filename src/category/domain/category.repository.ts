import { IRepository } from 'src/shared/domain/repository/repository.interface';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { Category } from './category.entity';

export interface ICategoryRepository extends IRepository<Category, Uuid> {}
