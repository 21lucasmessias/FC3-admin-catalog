import { Category } from 'src/category/domain/category.entity';
import { CategoryInMemoryRepository } from '../category-in-memory.repository';

describe('CategoryInMemoryRepository', () => {
  describe('getEntity', () => {
    describe('given a CategoryInMemoryRepository instance', () => {
      let categoryInMemoryRepository: CategoryInMemoryRepository;

      beforeEach(() => {
        categoryInMemoryRepository = new CategoryInMemoryRepository();
      });

      describe('when getEntity is called', () => {
        let result: any;

        beforeEach(() => {
          result = categoryInMemoryRepository.getEntity();
        });

        it('then should return Category class', () => {
          expect(result).toBe(Category);
        });
      });
    });
  });

  describe('applyFilter', () => {
    describe('given a CategoryInMemoryRepository instance', () => {
      let categoryInMemoryRepository: CategoryInMemoryRepository;
      let categories: Category[];
      let categoriesMap: Map<string, Category>;

      beforeEach(() => {
        categoryInMemoryRepository = new CategoryInMemoryRepository();
        categories = [new Category({ name: 'Category 1' }), new Category({ name: 'Category 2' })];
        categoriesMap = new Map([
          [categories[0].categoryId.id, categories[0]],
          [categories[1].categoryId.id, categories[1]],
        ]);
      });

      describe('when applyFilter is called without filter', () => {
        let result: any;

        beforeEach(async () => {
          result = await categoryInMemoryRepository['applyFilter'](categoriesMap, null);
        });

        it('then should return all categories', () => {
          expect(result).toEqual(categories);
        });
      });

      describe('when applyFilter is called with filter', () => {
        let result: any;

        beforeEach(async () => {
          result = await categoryInMemoryRepository['applyFilter'](categoriesMap, 'category 1');
        });

        it('then should return filtered categories', () => {
          expect(result).toEqual([categories[0]]);
        });
      });
    });
  });

  describe('applySort', () => {
    describe('given a CategoryInMemoryRepository instance', () => {
      let categoryInMemoryRepository: CategoryInMemoryRepository;
      let categories: Category[];

      beforeEach(() => {
        categoryInMemoryRepository = new CategoryInMemoryRepository();
        categories = [
          new Category({ createdAt: new Date('2021-01-02'), name: 'Category 2' }),
          new Category({ createdAt: new Date('2021-01-01'), name: 'Category 1' }),
        ];
      });

      describe('when applySort is called without sort', () => {
        let result: any;

        beforeEach(() => {
          result = categoryInMemoryRepository['applySort'](categories, null, null);
        });

        it('then should return categories sorted by createdAt desc', () => {
          expect(result).toEqual([categories[0], categories[1]]);
        });
      });

      describe('when applySort is called with sort', () => {
        let result: any;

        beforeEach(() => {
          result = categoryInMemoryRepository['applySort'](categories, 'name', 'asc');
        });

        it('then should return categories sorted by name asc', () => {
          expect(result).toEqual([categories[1], categories[0]]);
        });
      });
    });
  });
});
