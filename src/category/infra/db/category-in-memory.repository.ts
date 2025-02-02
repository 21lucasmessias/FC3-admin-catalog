import { Category } from 'src/category/domain/category.entity';
import { SortDirection } from 'src/shared/domain/repository/search-params';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from 'src/shared/infra/db/in-memory/in-memory-searchable.repository';

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> {
  sortableFields: string[] = ['createdAt', 'name'];

  protected async applyFilter(entities: Map<string, Category>, filter: string | null): Promise<Category[]> {
    const items = Array.from(entities.values());

    if (!filter) return items;

    return items.filter((category) => {
      return category.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  protected applySort(entities: Category[], sort: string | null, sortDir: SortDirection | null): Category[] {
    if (sort) {
      return super.applySort(entities, sort, sortDir);
    }

    return super.applySort(entities, 'createdAt', 'desc');
  }
}
