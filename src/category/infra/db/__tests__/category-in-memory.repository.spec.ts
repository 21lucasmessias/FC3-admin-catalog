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
});
