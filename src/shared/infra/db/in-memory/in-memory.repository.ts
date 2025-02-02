import { Entity } from 'src/shared/domain/entity';
import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { IRepository } from 'src/shared/domain/repository/repository.interface';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export abstract class InMemoryRepository<E extends Entity, EntityId extends Uuid> implements IRepository<E, EntityId> {
  protected entities: Map<string, E> = new Map();
  private deletedEntities: Map<string, E> = new Map();

  async insert(entity: E): Promise<E> {
    this.entities.set((entity.entityId as EntityId).id, entity);

    return entity;
  }

  async bulkInsert(entities: E[]): Promise<E[]> {
    entities.forEach((entity) => this.entities.set((entity.entityId as EntityId).id, entity));

    return entities;
  }

  async update(entityId: EntityId, entity: Partial<E>): Promise<E> {
    const existingEntity = this.entities.get(entityId.id);

    if (!existingEntity) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }

    const updatedEntity = this.deepMerge(existingEntity, entity);
    this.entities.set(entityId.id, updatedEntity as E);

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
    const entity = this.entities.get(entityId.id);

    if (!entity) {
      throw new NotFoundError(entityId, this.getEntity());
    }

    this.entities.delete(entityId.id);
    this.deletedEntities.set(entityId.id, entity);

    return entity;
  }

  async find(entityId: EntityId): Promise<E | null> {
    return this.entities.get(entityId.id) || null;
  }

  async findAll(): Promise<E[]> {
    const entities = Array.from(this.entities.values());
    return entities;
  }

  abstract getEntity(): new (...args: any[]) => E;
}
