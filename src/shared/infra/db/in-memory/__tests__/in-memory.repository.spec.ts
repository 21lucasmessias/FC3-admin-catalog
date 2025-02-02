import { StubEntity } from '../stubs/entity.stub';
import { StubInMemoryRepository } from '../stubs/in-memory.repository.stub';

describe('in memory repository', () => {
  describe('given a in memory repository', () => {
    let repo: StubInMemoryRepository;

    beforeEach(() => {
      repo = new StubInMemoryRepository();
    });

    describe('given a entity', () => {
      let entity: StubEntity;

      beforeEach(() => {
        entity = new StubEntity({ name: 'test', price: 10 });
      });

      describe('when insert is called', () => {
        beforeEach(async () => {
          await repo.insert(entity);
        });

        it('then should insert the entity', async () => {
          await expect(repo.find(entity.entityId)).resolves.toEqual(entity);
          await expect(repo.findAll()).resolves.toEqual([entity]);
        });
      });

      describe('when bulkInsert is called', () => {
        let entities: StubEntity[];

        beforeEach(async () => {
          entities = [new StubEntity({ name: 'test', price: 10 }), new StubEntity({ name: 'test2', price: 10 })];
          await repo.bulkInsert(entities);
        });

        it('then should insert the entities', async () => {
          await expect(repo.find(entities[0].entityId)).resolves.toEqual(entities[0]);
          await expect(repo.find(entities[1].entityId)).resolves.toEqual(entities[1]);
          await expect(repo.findAll()).resolves.toEqual(entities);
        });
      });
    });
  });
});
