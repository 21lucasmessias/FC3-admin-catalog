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
        expect(category.createdAt).toBeInstanceOf(Date);
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

  describe('given a Category instance', () => {
    let category: Category;

    beforeEach(() => {
      category = Category.create({
        name: 'Category Name',
        description: 'Category Description',
        isActive: true,
      });
    });

    describe('when changeName is called', () => {
      beforeEach(() => {
        category.changeName('New Category Name');
      });

      test('then should have the new name', () => {
        expect(category.name).toBe('New Category Name');
      });
    });

    describe('when changeDescription is called', () => {
      beforeEach(() => {
        category.changeDescription('New Category Description');
      });

      test('then should have the new description', () => {
        expect(category.description).toBe('New Category Description');
      });
    });

    describe('when activate is called', () => {
      beforeEach(() => {
        category.activate();
      });

      test('then should be active', () => {
        expect(category.isActive).toBe(true);
      });
    });

    describe('when deactivate is called', () => {
      beforeEach(() => {
        category.deactivate();
      });

      test('then should be inactive', () => {
        expect(category.isActive).toBe(false);
      });
    });
  });
});
