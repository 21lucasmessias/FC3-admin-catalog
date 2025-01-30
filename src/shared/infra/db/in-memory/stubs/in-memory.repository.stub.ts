import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { InMemoryRepository } from '../in-memory.repository';
import { StubEntity } from './entity.stub';

export class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}
