import { Category, CategoryConstructorProps, CategoryCreateCommand } from './../category.entity';

describe('Category Entity', () => {
  describe('given a valid CategoryCreateCommand', () => {
    let categoryCreateCommand: CategoryCreateCommand;

    beforeEach(() => {
      categoryCreateCommand = {
        name: 'Category Name',
        description: 'Category Description',
        isActive: true,
      };
    });

    describe('when create is called', () => {
      let category: Category;

      beforeEach(() => {
        category = Category.create(categoryCreateCommand);
      });

      test('then should create a new Category', () => {
        expect(category).toBeDefined();
      });

      test('then should have the correct attributes', () => {
        expect(category.name).toBe(categoryCreateCommand.name);
        expect(category.description).toBe(categoryCreateCommand.description);
        expect(category.isActive).toBe(categoryCreateCommand.isActive);
        expect(category.createdAt).toBeDefined();
        expect(category.categoryId).toBeUndefined();
      });
    });
  });

  describe('given a constructor reflection', () => {
    let categoryConstructorProps: CategoryConstructorProps;

    beforeEach(() => {
      categoryConstructorProps = {
        categoryId: '123',
        name: 'Category Name',
        description: 'Category Description',
        isActive: true,
        createdAt: new Date(),
      };
    });

    describe('when the constructor is called', () => {
      let category: Category;

      beforeEach(() => {
        category = new Category(categoryConstructorProps);
      });

      test('then should create a new Category', () => {
        expect(category).toBeDefined();
      });

      test('then should have the correct attributes', () => {
        expect(category.categoryId).toBe(categoryConstructorProps.categoryId);
        expect(category.name).toBe(categoryConstructorProps.name);
        expect(category.description).toBe(categoryConstructorProps.description);
        expect(category.isActive).toBe(categoryConstructorProps.isActive);
        expect(category.createdAt).toBe(categoryConstructorProps.createdAt);
      });
    });
  });
});
