import { Entity } from 'src/shared/domain/entity';
import { ISearchableRepository } from 'src/shared/domain/repository/repository.interface';
import { SearchParams, SortDirection } from 'src/shared/domain/repository/search-params';
import { SearchResult } from 'src/shared/domain/repository/search-result';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { InMemoryRepository } from './in-memory.repository';

export abstract class InMemorySearchableRepository<E extends Entity, EntityId extends Uuid, Filter = string>
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  abstract sortableFields: string[];

  async search(searchInput: SearchParams<Filter>): Promise<SearchResult<E>> {
    const filteredEntities = await this.applyFilter(this.entities, searchInput.filter);
    const sortedEntities = this.applySort(filteredEntities, searchInput.sort, searchInput.sort_dir);
    const paginatedEntities = this.applyPaginate(sortedEntities, searchInput.page, searchInput.per_page);

    return new SearchResult({
      items: paginatedEntities,
      total: filteredEntities.length,
      current_page: searchInput.page!,
      per_page: searchInput.per_page!,
    });
  }

  protected abstract applyFilter(entities: Map<string, E>, filter: Filter | null): Promise<E[]>;

  protected applySort(
    entities: E[],
    sort: string | null,
    sortDir: SortDirection | null,
    customGetter?: (entity: E, sort: string) => any,
  ): E[] {
    if (!sort || !this.sortableFields.includes(sort)) {
      return entities;
    }

    const getter = customGetter || ((entity: E, sort: string) => entity[sort]);

    return entities.sort((a, b) => {
      const valueA = getter(a, sort);
      const valueB = getter(b, sort);

      if (valueA > valueB) {
        return sortDir === 'asc' ? 1 : -1;
      }

      if (valueA < valueB) {
        return sortDir === 'asc' ? -1 : 1;
      }

      return 0;
    });
  }

  protected applyPaginate(entities: E[], page: number, perPage: number): E[] {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return entities.slice(start, end);
  }
}
