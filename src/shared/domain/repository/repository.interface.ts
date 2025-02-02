import { Entity } from '../entity';
import { ValueObject } from '../value-object';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<E>;
  bulkInsert(entities: E[]): Promise<E[]>;
  update(entityId: EntityId, entity: Partial<E>): Promise<E>;
  delete(entityId: EntityId): Promise<E>;

  find(entityId: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}

export interface ISearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E>,
> extends IRepository<E, EntityId> {
  sortableFields: string[];
  search(searchInput: SearchInput): Promise<SearchOutput>;
}
