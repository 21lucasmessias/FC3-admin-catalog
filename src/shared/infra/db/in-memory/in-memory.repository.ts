import { Entity } from 'src/shared/domain/entity';
import { IRepository } from 'src/shared/domain/repository/repository.interface';
import { ValueObject } from 'src/shared/domain/value-object';

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject>
  implements IRepository<E, EntityId>
{
  private entities: Map<string, E> = new Map();
  private deletedEntities: Map<string, E> = new Map();

  async insert(entity: E): Promise<E> {
    this.entities.set(entity.entityId.toString(), entity);
    return entity;
  }

  async bulkInsert(entities: E[]): Promise<E[]> {
    entities.forEach((entity) => this.entities.set(entity.entityId.toString(), entity));
    return entities;
  }

  async update(entityId: EntityId, entity: Partial<E>): Promise<E> {
    const existingEntity = this.entities.get(entityId.toString());
    if (!existingEntity) {
      throw new Error('Entity not found');
    }
    const updatedEntity = this.deepMerge(existingEntity, entity);
    this.entities.set(entityId.toString(), updatedEntity as E);
    return updatedEntity as E;
  }

  private deepMerge(target: E, source: Partial<E>): E {
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], this.deepMerge(target[key], source[key]));
      }
    }
    return { ...target, ...source };
  }

  async delete(entityId: EntityId): Promise<E> {
    const entity = this.entities.get(entityId.toString());
    if (!entity) {
      throw new Error('Entity not found');
    }
    this.entities.delete(entityId.toString());
    this.deletedEntities.set(entityId.toString(), entity);
    return entity;
  }

  async find(entityId: EntityId): Promise<E | null> {
    return this.entities.get(entityId.toString()) || null;
  }

  async findAll(): Promise<E[]> {
    return Array.from(this.entities.values());
  }

  abstract getEntity(): new (...args: any[]) => E;
}
