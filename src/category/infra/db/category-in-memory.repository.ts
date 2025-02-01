import { Category } from 'src/category/domain/category.entity';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { InMemoryRepository } from 'src/shared/infra/db/in-memory/in-memory.repository';

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid> {
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
