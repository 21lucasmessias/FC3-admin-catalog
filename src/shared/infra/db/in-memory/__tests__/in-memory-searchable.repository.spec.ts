import { SearchParams, SortDirection } from 'src/shared/domain/repository/search-params';
import { StubEntity } from '../stubs/entity.stub';
import { StubInMemorySearchableRepository } from '../stubs/in-memory-searchable.repository.stub';

describe('InMemorySearchableRepository', () => {
  describe('applyFilter', () => {
    describe('given a StubInMemorySearchableRepository', () => {
      let repository: StubInMemorySearchableRepository;

      beforeEach(() => {
        repository = new StubInMemorySearchableRepository();
      });

      describe('given a list of entities', () => {
        let entities: Map<string, StubEntity>;

        beforeEach(() => {
          repository.insert(new StubEntity({ name: 'Entity 1', price: 100 }));
          repository.insert(new StubEntity({ name: 'Entity 3', price: 300 }));
          repository.insert(new StubEntity({ name: 'Entity 2', price: 200 }));

          entities = repository['entities'];
        });

        describe('when applyFilter is called with null', () => {
          let entitiesSpy: jest.SpyInstance;
          let filterSpy: jest.SpyInstance;

          let filteredItems: StubEntity[];

          beforeEach(async () => {
            const filter = null;

            entitiesSpy = jest.spyOn(repository['entities'], 'values');
            filterSpy = jest.spyOn(Array.prototype, 'filter');

            filteredItems = await repository['applyFilter'](entities, filter);
          });

          it('then it should return all entities', () => {
            expect(filteredItems).toHaveLength(3);
            expect(entitiesSpy).toHaveBeenCalled();
            expect(filterSpy).not.toHaveBeenCalled();
          });
        });

        describe('when applyFilter is called with a valid filter for name', () => {
          let filter = 'Entity 1';

          let entitiesSpy: jest.SpyInstance;
          let filterSpy: jest.SpyInstance;

          let filteredItems: StubEntity[];

          beforeEach(async () => {
            entitiesSpy = jest.spyOn(repository['entities'], 'values');
            filterSpy = jest.spyOn(Array.prototype, 'filter');

            filteredItems = await repository['applyFilter'](entities, filter);
          });

          it('then it should return filtered entities', () => {
            expect(filteredItems).toHaveLength(1);
            expect(entitiesSpy).toHaveBeenCalled();
            expect(filterSpy).toHaveBeenCalled();
          });
        });

        describe('when applyFilter is called with a valid filter for price', () => {
          let filter = '200';

          let entitiesSpy: jest.SpyInstance;
          let filterSpy: jest.SpyInstance;

          let filteredItems: StubEntity[];

          beforeEach(async () => {
            entitiesSpy = jest.spyOn(repository['entities'], 'values');
            filterSpy = jest.spyOn(Array.prototype, 'filter');

            filteredItems = await repository['applyFilter'](entities, filter);
          });

          it('then it should return filtered entities', () => {
            expect(filteredItems).toHaveLength(1);
            expect(entitiesSpy).toHaveBeenCalled();
            expect(filterSpy).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('applySort', () => {
    describe('given a StubInMemorySearchableRepository', () => {
      let repository: StubInMemorySearchableRepository;

      beforeEach(() => {
        repository = new StubInMemorySearchableRepository();
      });

      describe('given a list of entities', () => {
        let entities: Map<string, StubEntity>;

        beforeEach(() => {
          repository.insert(new StubEntity({ name: 'Entity 1', price: 100 }));
          repository.insert(new StubEntity({ name: 'Entity 3', price: 300 }));
          repository.insert(new StubEntity({ name: 'Entity 2', price: 200 }));

          entities = repository['entities'];
        });

        describe('when applySort is called with sort null', () => {
          let sort: string | null;
          let sortDir: SortDirection | null;

          let sortSpy: jest.SpyInstance;

          let sortedItems: StubEntity[];

          beforeEach(async () => {
            sort = null;
            sortDir = 'asc';

            sortSpy = jest.spyOn(Array.prototype, 'sort');

            sortedItems = repository['applySort'](Array.from(entities.values()), sort, sortDir);
          });

          it('then it should return sorted entities', () => {
            expect(sortedItems).toHaveLength(3);
            expect(sortSpy).not.toHaveBeenCalled();
          });
        });

        describe('when applySort is called with sort not included in sortableFields', () => {
          let sort: string | null;
          let sortDir: SortDirection | null;

          let sortSpy: jest.SpyInstance;

          let sortedItems: StubEntity[];

          beforeEach(async () => {
            sort = 'price';
            sortDir = 'asc';

            sortSpy = jest.spyOn(Array.prototype, 'sort');

            sortedItems = repository['applySort'](Array.from(entities.values()), sort, sortDir);
          });

          it('then it should return sorted entities', () => {
            expect(sortedItems).toHaveLength(3);
            expect(sortSpy).not.toHaveBeenCalled();
          });
        });

        describe('when applySort is called with valid sort', () => {
          let sort = 'name';
          let sortDir: SortDirection | null;

          let sortSpy: jest.SpyInstance;

          let sortedItems: StubEntity[];

          beforeEach(async () => {
            sortDir = 'asc';

            sortSpy = jest.spyOn(Array.prototype, 'sort');

            sortedItems = repository['applySort'](Array.from(entities.values()), sort, sortDir);
          });

          it('then it should return sorted entities', () => {
            expect(sortedItems).toHaveLength(3);
            expect(sortSpy).toHaveBeenCalled();
            expect(sortedItems[0].name).toBe('Entity 1');
            expect(sortedItems[1].name).toBe('Entity 2');
            expect(sortedItems[2].name).toBe('Entity 3');
          });
        });

        describe('when applySort is called with valid sort and sortDir desc', () => {
          let sort = 'name';
          let sortDir: SortDirection | null;

          let sortSpy: jest.SpyInstance;

          let sortedItems: StubEntity[];

          beforeEach(async () => {
            sortDir = 'desc';

            sortSpy = jest.spyOn(Array.prototype, 'sort');

            sortedItems = repository['applySort'](Array.from(entities.values()), sort, sortDir);
          });

          it('then it should return sorted entities', () => {
            expect(sortedItems).toHaveLength(3);
            expect(sortSpy).toHaveBeenCalled();
            expect(sortedItems[0].name).toBe('Entity 3');
            expect(sortedItems[1].name).toBe('Entity 2');
            expect(sortedItems[2].name).toBe('Entity 1');
          });
        });

        describe('when applySort is called with valid sort and customGetter', () => {
          let sort = 'name';
          let sortDir: SortDirection | null;
          let customGetter = (entity: StubEntity, sort: string) => entity.price;

          let sortSpy: jest.SpyInstance;

          let sortedItems: StubEntity[];

          beforeEach(async () => {
            sortDir = 'asc';

            sortSpy = jest.spyOn(Array.prototype, 'sort');

            sortedItems = repository['applySort'](Array.from(entities.values()), sort, sortDir, customGetter);
          });

          it('then it should return sorted entities', () => {
            expect(sortedItems).toHaveLength(3);
            expect(sortSpy).toHaveBeenCalled();
            expect(sortedItems[0].name).toBe('Entity 1');
            expect(sortedItems[1].name).toBe('Entity 2');
            expect(sortedItems[2].name).toBe('Entity 3');
          });
        });
      });
    });
  });

  describe('applyPaginate', () => {
    describe('given an arrange of props to call applyPaginate', () => {
      const entities = [
        new StubEntity({ name: 'Entity 1', price: 100 }),
        new StubEntity({ name: 'Entity 3', price: 300 }),
        new StubEntity({ name: 'Entity 2', price: 200 }),
      ];

      const arrange = [
        { page: 1, perPage: 1, expected: [entities[0]] },
        { page: 2, perPage: 1, expected: [entities[1]] },
        { page: 3, perPage: 1, expected: [entities[2]] },
        { page: 1, perPage: 2, expected: [entities[0], entities[1]] },
        { page: 2, perPage: 2, expected: [entities[2]] },
        { page: 1, perPage: 3, expected: entities },
        { page: 2, perPage: 3, expected: [] },
      ];

      test.each(arrange)(
        'when page is $page and perPage is $perPage, then it should return $expected',
        ({ page, perPage, expected }) => {
          const repository = new StubInMemorySearchableRepository();
          const paginatedItems = repository['applyPaginate'](entities, page, perPage);
          expect(paginatedItems).toEqual(expected);
        },
      );
    });
  });

  describe('search', () => {
    describe('given a StubInMemorySearchableRepository', () => {
      let repository: StubInMemorySearchableRepository;

      beforeEach(() => {
        repository = new StubInMemorySearchableRepository();
      });

      describe('given a list of entities', () => {
        let entities: Map<string, StubEntity>;
        let listEntities: StubEntity[];

        beforeEach(() => {
          repository.insert(new StubEntity({ name: 'Entity 1', price: 100 }));
          repository.insert(new StubEntity({ name: 'Entity 3', price: 300 }));
          repository.insert(new StubEntity({ name: 'Entity 2', price: 200 }));

          entities = repository['entities'];
          listEntities = Array.from(entities.values());
        });

        describe('when search params is null', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams();

            searchResult = await repository.search(searchInput);
          });

          it('then it should return default values for pagination and the first three entities', () => {
            expect(searchResult.items).toEqual([listEntities[0], listEntities[1], listEntities[2]]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(15);
          });
        });

        describe('when search params has a filter', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ filter: 'Entity 1' });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the filtered entity', () => {
            expect(searchResult.items).toEqual([listEntities[0]]);
            expect(searchResult.total).toBe(1);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(15);
          });
        });

        describe('when search params has a sort', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ sort: 'name', sort_dir: 'asc' });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the sorted entities', () => {
            expect(searchResult.items).toEqual([listEntities[0], listEntities[2], listEntities[1]]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(15);
          });
        });

        describe('when search params has a sort and sort_dir desc', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ sort: 'name', sort_dir: 'desc' });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the sorted entities', () => {
            expect(searchResult.items).toEqual([listEntities[1], listEntities[2], listEntities[0]]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(15);
          });
        });

        describe('when search params has a sort and customGetter', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ sort: 'name', sort_dir: 'asc' });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the sorted entities', () => {
            expect(searchResult.items).toEqual([listEntities[0], listEntities[2], listEntities[1]]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(15);
          });
        });

        describe('when search params has a page and per_page', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ page: 2, per_page: 1 });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the paginated entities', () => {
            expect(searchResult.items).toEqual([listEntities[1]]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(2);
            expect(searchResult.per_page).toBe(1);
          });
        });

        describe('when search params has a page greater than total pages', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ page: 2, per_page: 3 });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return empty array', () => {
            expect(searchResult.items).toEqual([]);
            expect(searchResult.total).toBe(3);
            expect(searchResult.current_page).toBe(2);
            expect(searchResult.per_page).toBe(3);
          });
        });

        describe('when search params has a filter, sort, page and per_page', () => {
          let searchInput: SearchParams;
          let searchResult: any;

          beforeEach(async () => {
            searchInput = new SearchParams({ filter: 'Entity 1', sort: 'name', sort_dir: 'asc', page: 1, per_page: 1 });

            searchResult = await repository.search(searchInput);
          });

          it('then it should return the filtered, sorted and paginated entities', () => {
            expect(searchResult.items).toEqual([listEntities[0]]);
            expect(searchResult.total).toBe(1);
            expect(searchResult.current_page).toBe(1);
            expect(searchResult.per_page).toBe(1);
          });
        });
      });
    });
  });
});
