import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { InMemorySearchableRepository } from '../in-memory-searchable.repository';
import { StubEntity } from './entity.stub';

export class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity, Uuid> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(entities: Map<string, StubEntity>, filter: string | null): Promise<StubEntity[]> {
    const items = Array.from(entities.values());

    if (!filter) {
      return items;
    }

    const lowerCaseFilter = filter.toLowerCase();
    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(lowerCaseFilter) || item.price.toString() === filter;
    });

    return filteredItems;
  }

  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
