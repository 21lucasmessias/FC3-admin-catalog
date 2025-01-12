import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { Category, CategoryConstructorProps, CategoryCreateCommand } from './../category.entity';

describe('Category Entity', () => {
  let categoryValidatorSpy: jest.SpyInstance;

  beforeEach(() => {
    categoryValidatorSpy = jest.spyOn(Category, 'validate');
  });

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

      test('then should call validate', () => {
        expect(categoryValidatorSpy).toHaveBeenCalledTimes(1);
      });

      test('then should create a new Category', () => {
        expect(category).toBeDefined();
      });

      test('then should have the correct attributes', () => {
        expect(category.name).toBe(categoryCreateCommand.name);
        expect(category.description).toBe(categoryCreateCommand.description);
        expect(category.isActive).toBe(categoryCreateCommand.isActive);
        expect(category.createdAt).toBeInstanceOf(Date);
        expect(category.categoryId).toBeDefined();
      });

      test('should have an entityId', () => {
        expect(category.entityId).toBeDefined();
      });

      describe('when toJson is called', () => {
        let json: any;

        beforeEach(() => {
          json = category.toJson();
        });

        test('then should return an object with the correct attributes', () => {
          expect(json).toEqual({
            categoryId: category.categoryId.id,
            name: 'Category Name',
            description: 'Category Description',
            isActive: true,
            createdAt: category.createdAt!.toISOString(),
          });
        });
      });
    });
  });

  describe('given a constructor reflection', () => {
    let categoryConstructorProps: CategoryConstructorProps;

    beforeEach(() => {
      categoryConstructorProps = {
        categoryId: new Uuid(),
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

      test('then should not call validate', () => {
        expect(categoryValidatorSpy).toHaveBeenCalledTimes(0);
      });

      test('should have an entityId', () => {
        expect(category.entityId).toBeDefined();
      });

      describe('when toJson is called', () => {
        let json: any;

        beforeEach(() => {
          json = category.toJson();
        });

        test('then should return an object with the correct attributes', () => {
          expect(json).toEqual({
            categoryId: category.categoryId.id,
            name: 'Category Name',
            description: 'Category Description',
            isActive: true,
            createdAt: category.createdAt!.toISOString(),
          });
        });
      });
    });
  });

  describe('methods', () => {
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

        test('then should call validate', () => {
          expect(categoryValidatorSpy).toHaveBeenCalledTimes(2);
        });
      });

      describe('when changeDescription is called', () => {
        beforeEach(() => {
          category.changeDescription('New Category Description');
        });

        test('then should have the new description', () => {
          expect(category.description).toBe('New Category Description');
        });

        test('then should call validate', () => {
          expect(categoryValidatorSpy).toHaveBeenCalledTimes(2);
        });
      });

      describe('when activate is called', () => {
        beforeEach(() => {
          category.activate();
        });

        test('then should be active', () => {
          expect(category.isActive).toBe(true);
        });

        test('then should call validate', () => {
          expect(categoryValidatorSpy).toHaveBeenCalledTimes(1);
        });
      });

      describe('when deactivate is called', () => {
        beforeEach(() => {
          category.deactivate();
        });

        test('then should be inactive', () => {
          expect(category.isActive).toBe(false);
        });

        test('then should call validate', () => {
          expect(categoryValidatorSpy).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('validator', () => {
    describe('given an invalid CategoryCreateCommand', () => {
      let categoryCreateCommand: CategoryCreateCommand;

      beforeEach(() => {
        categoryCreateCommand = {
          name: 'Category Name',
          description: 'Category Description',
          isActive: true,
        };
      });

      describe('given name is null', () => {
        beforeEach(() => {
          categoryCreateCommand.name = null as any;
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
              ],
            });
          });
        });
      });

      describe('given name is undefined', () => {
        beforeEach(() => {
          categoryCreateCommand.name = undefined as any;
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              name: [
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
              ],
            });
          });
        });
      });

      describe('given name is a number', () => {
        beforeEach(() => {
          categoryCreateCommand.name = 123 as any;
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
            });
          });
        });
      });

      describe('given name is empty', () => {
        beforeEach(() => {
          categoryCreateCommand.name = '';
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              name: ['name should not be empty'],
            });
          });
        });
      });

      describe('given name is longer than 255 characters', () => {
        beforeEach(() => {
          categoryCreateCommand.name = 'a'.repeat(256);
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              name: ['name must be shorter than or equal to 255 characters'],
            });
          });
        });
      });

      describe('given description is null', () => {
        beforeEach(() => {
          categoryCreateCommand.description = null as any;
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              description: ['description must be a string'],
            });
          });
        });
      });

      describe('given isActive is null', () => {
        beforeEach(() => {
          categoryCreateCommand.isActive = null as any;
        });

        describe('when create is called', () => {
          test('then validate should throw an error', () => {
            expect(() => Category.create(categoryCreateCommand)).containsErrorMessages({
              isActive: ['isActive must be a boolean value'],
            });
          });
        });
      });
    });

    describe('given an invalid Category method calls', () => {
      let category: Category;

      beforeEach(() => {
        category = Category.create({
          name: 'Category Name',
          description: 'Category Description',
          isActive: true,
        });
      });

      describe('when changeName is called with null', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeName(null as any)).containsErrorMessages({
            name: [
              'name should not be empty',
              'name must be a string',
              'name must be shorter than or equal to 255 characters',
            ],
          });
        });
      });

      describe('when changeName is called with undefined', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeName(undefined as any)).containsErrorMessages({
            name: [
              'name should not be empty',
              'name must be a string',
              'name must be shorter than or equal to 255 characters',
            ],
          });
        });
      });

      describe('when changeName is called with an empty string', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeName('')).containsErrorMessages({
            name: ['name should not be empty'],
          });
        });
      });

      describe('when changeName is called with a number', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeName(123 as any)).containsErrorMessages({
            name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
          });
        });
      });

      describe('when changeName is called with a string longer than 255 characters', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeName('a'.repeat(256))).containsErrorMessages({
            name: ['name must be shorter than or equal to 255 characters'],
          });
        });
      });

      describe('when changeDescription is called with a number', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeDescription(123 as any)).containsErrorMessages({
            description: ['description must be a string'],
          });
        });
      });

      describe('when changeDescription is called with a null value', () => {
        test('then validate should throw an error', () => {
          expect(() => category.changeDescription(null as any)).containsErrorMessages({
            description: ['description must be a string'],
          });
        });
      });
    });
  });
});
