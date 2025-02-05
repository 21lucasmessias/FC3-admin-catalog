import { ChanceRandom } from 'src/shared/domain/utils/chance.random';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { CategoryFakeBuilder } from '../category-fake.builder';

describe('CategoryFakerBuilder Unit Tests', () => {
  describe('categoryId', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();
      });

      describe('when getValue is called', () => {
        test('then should throw error', () => {
          expect(() => faker.categoryId).toThrowError(
            new Error("Property categoryId not have a factory, use 'with' methods"),
          );
        });
      });

      describe('when category is not set', () => {
        test('then should be undefined', () => {
          expect(faker['_categoryId']).toBeUndefined();
        });
      });

      describe('when withCategoryId is called', () => {
        let categoryId: Uuid;

        beforeEach(() => {
          categoryId = new Uuid();
          faker.withCategoryId(categoryId);
        });

        test('then should set categoryId', () => {
          expect(faker['_categoryId']).toBe(categoryId);
          expect(faker.categoryId).toBe(categoryId);
        });

        describe('and withCategoryId is called with a factory', () => {
          beforeEach(() => {
            faker.withCategoryId(() => categoryId);
          });

          test('then should set categoryId', () => {
            expect((faker['_categoryId'] as () => any)()).toBe(categoryId);
          });
        });
      });

      describe('and a factory is set to return a fixed uuid', () => {
        let categoryId: Uuid;
        let mockFactory: jest.Mock;

        beforeEach(() => {
          categoryId = new Uuid();
          mockFactory = jest.fn(() => categoryId);
        });

        describe('when withCategoryId is called', () => {
          beforeEach(() => {
            faker.withCategoryId(mockFactory);
          });

          describe('when build is called', () => {
            beforeEach(() => {
              faker.build();
            });

            test('then should call the factory', () => {
              expect(mockFactory).toHaveBeenCalledTimes(1);
            });
          });
        });
      });

      describe('and many categories are set to use a fixed uuid', () => {
        let fakerMany: CategoryFakeBuilder;

        beforeEach(() => {
          fakerMany = CategoryFakeBuilder.theCategories(2);
        });

        describe('when withCategoryId is called', () => {
          let categoryId: Uuid;

          beforeEach(() => {
            categoryId = new Uuid();
            fakerMany.withCategoryId(() => categoryId);
          });

          test('then should set categoryId', () => {
            expect(fakerMany.build()[0].categoryId).toBe(categoryId);
            expect(fakerMany.build()[1].categoryId).toBe(categoryId);
          });
        });
      });
    });
  });

  describe('name', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;
      let randomSpy: jest.SpyInstance;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();

        const random = new ChanceRandom();
        randomSpy = jest.spyOn(random, 'chars');
        faker['random'] = random;
      });

      describe('given name is not set', () => {
        describe('when getValue is called', () => {
          let name: string;

          beforeEach(() => {
            name = faker.name;
          });

          test('then should be a string created by Random', () => {
            expect(typeof name).toBe('string');
            expect(name.length).toBeGreaterThan(0);
            expect(randomSpy).toHaveBeenCalledTimes(1);
          });
        });

        describe('when _name is called', () => {
          let name: string;

          beforeEach(() => {
            name = (faker['_name'] as () => string)();
          });

          test('then should be a function that return a random number of chars', () => {
            expect(faker['_name']).toBeInstanceOf(Function);
          });

          test('then should return a string', () => {
            expect(typeof name).toBe('string');
          });
        });
      });

      describe('when withName is called with a string', () => {
        let name: string;

        beforeEach(() => {
          name = 'name test';
          faker.withName(name);
        });

        test('then should set name', () => {
          expect(faker['_name']).toBe(name);
          expect(faker.name).toBe(name);
        });
      });

      describe('when withName is called with a factory', () => {
        let name: string;

        beforeEach(() => {
          name = 'name test';
          faker.withName(() => name);
        });

        test('then should set name', () => {
          expect(faker.name).toBe(name);
        });
      });

      describe('when withName is called with a number', () => {
        beforeEach(() => {
          faker.withName(123 as any);
        });

        test('then should not throw error', () => {
          expect(faker.name).toBe(123);
        });

        describe('when build is called', () => {
          test('then should throw Validation Error', () => {
            expect(() => faker.build()).containsErrorMessages({
              name: ['name must be a string', 'name must be shorter than or equal to 255 characters'],
            });
          });
        });
      });

      describe('when withName is called with a string that is too long', () => {
        beforeEach(() => {
          faker.withName('a'.repeat(256));
        });

        test('then should not throw error', () => {
          expect(faker.name).toBe('a'.repeat(256));
        });

        describe('when build is called', () => {
          test('then should throw Validation Error', () => {
            expect(() => faker.build()).containsErrorMessages({
              name: ['name must be shorter than or equal to 255 characters'],
            });
          });
        });
      });

      describe('when withInvalidNameTooLong is called', () => {
        beforeEach(() => {
          faker.withInvalidNameTooLong();
        });

        test('then should not throw error', () => {
          expect(faker.name.length).toBe(256);
        });

        describe('when build is called', () => {
          test('then should throw Validation Error', () => {
            expect(() => faker.build()).containsErrorMessages({
              name: ['name must be shorter than or equal to 255 characters'],
            });
          });
        });
      });
    });

    describe('given many fake categories', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.theCategories(2);
      });

      describe('when withName is called with a factory that receives index', () => {
        beforeEach(() => {
          faker.withName((index) => `name test ${index}`);
        });

        test('then should set name', () => {
          const categories = faker.build();
          expect(categories[0].name).toBe('name test 0');
          expect(categories[1].name).toBe('name test 1');
        });
      });
    });
  });

  describe('description', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;
      let randomSpy: jest.SpyInstance;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();

        const random = new ChanceRandom();
        randomSpy = jest.spyOn(random, 'paragraphs');
        faker['random'] = random;
      });

      describe('given description is not set', () => {
        describe('when getValue is called', () => {
          let description: string;

          beforeEach(() => {
            description = faker.description;
          });

          test('then should be a string created by Random', () => {
            expect(typeof description).toBe('string');
            expect(description.length).toBeGreaterThan(0);
            expect(randomSpy).toHaveBeenCalledTimes(1);
          });
        });

        describe('when _description is called', () => {
          let description: string;

          beforeEach(() => {
            description = (faker['_description'] as () => string)();
          });

          test('then should be a function that return a random number of chars', () => {
            expect(faker['_description']).toBeInstanceOf(Function);
          });

          test('then should return a string', () => {
            expect(typeof description).toBe('string');
          });
        });
      });

      describe('when withDescription is called with a string', () => {
        let description: string;

        beforeEach(() => {
          description = 'description test';
          faker.withDescription(description);
        });

        test('then should set description', () => {
          expect(faker['_description']).toBe(description);
          expect(faker.description).toBe(description);
        });
      });

      describe('when withDescription is called with a factory', () => {
        let description: string;

        beforeEach(() => {
          description = 'description test';
          faker.withDescription(() => description);
        });

        test('then should set description', () => {
          expect(faker.description).toBe(description);
        });
      });

      describe('when withDescription is called with a number', () => {
        beforeEach(() => {
          faker.withDescription(123 as any);
        });

        test('then should not throw error', () => {
          expect(faker.description).toBe(123);
        });

        describe('when build is called', () => {
          test('then should throw Validation Error', () => {
            expect(() => faker.build()).containsErrorMessages({
              description: ['description must be a string'],
            });
          });
        });
      });

      describe('when withDescription is called with a string that is too long', () => {
        beforeEach(() => {
          faker.withDescription('a'.repeat(258));
        });

        test('then should not throw error', () => {
          expect(faker.description).toBe('a'.repeat(258));
        });

        describe('when build is called', () => {
          test('then should throw Validation Error', () => {
            expect(() => faker.build()).containsErrorMessages({
              description: ['description mus be shorter than or equal to 255 characters'],
            });
          });
        });
      });
    });

    describe('given many fake categories', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.theCategories(2);
      });

      describe('when withDescription is called with a factory that receives index', () => {
        beforeEach(() => {
          faker.withDescription((index) => `description test ${index}`);
        });

        test('then should set description', () => {
          const categories = faker.build();
          expect(categories[0].description).toBe('description test 0');
          expect(categories[1].description).toBe('description test 1');
        });
      });
    });
  });

  describe('isActive', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();
      });

      describe('when getValue is called', () => {
        test('then should be true', () => {
          expect(() => faker.isActive).toBeTruthy();
        });
      });

      describe('when accessing _isActive', () => {
        test('then should be a function', () => {
          expect(faker['_isActive']).toBeInstanceOf(Function);
        });

        test('then should return true', () => {
          expect((faker['_isActive'] as () => boolean)()).toBe(true);
        });
      });

      describe('when isActive is not set', () => {
        test('then getValue should be true', () => {
          expect(faker.isActive).toBe(true);
        });

        test('then _isActive should be a function', () => {
          expect(faker['_isActive']).toBeInstanceOf(Function);
        });
      });

      describe('when activate is called', () => {
        beforeEach(() => {
          faker.activate();
        });

        test('then should set isActive to true', () => {
          expect(faker['_isActive']).toBe(true);
          expect(faker.isActive).toBe(true);
        });
      });

      describe('when deactivate is called', () => {
        beforeEach(() => {
          faker.deactivate();
        });

        test('then should set isActive to false', () => {
          expect(faker['_isActive']).toBe(false);
          expect(faker.isActive).toBe(false);
        });
      });
    });
  });

  describe('createdAt', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();
      });

      describe('when getValue is called', () => {
        test('then should throw error', () => {
          expect(() => faker.createdAt).toThrowError(
            new Error("Property createdAt not have a factory, use 'with' methods"),
          );
        });
      });

      describe('when createdAt is not set', () => {
        test('then should be undefined', () => {
          expect(faker['_createdAt']).toBeUndefined();
        });
      });

      describe('when withCreatedAt is called', () => {
        let createdAt: Date;

        beforeEach(() => {
          createdAt = new Date();
          faker.withCreatedAt(createdAt);
        });

        test('then should set createdAt', () => {
          expect(faker['_createdAt']).toBe(createdAt);
          expect(faker.createdAt).toBe(createdAt);
        });

        describe('and withCreatedAt is called with a factory', () => {
          beforeEach(() => {
            faker.withCreatedAt(() => createdAt);
          });

          test('then should set createdAt', () => {
            expect((faker['_createdAt'] as () => any)()).toBe(createdAt);
          });
        });
      });

      describe('and a factory is set to return a fixed date', () => {
        let createdAt: Date;
        let mockFactory: jest.Mock;

        beforeEach(() => {
          createdAt = new Date();
          mockFactory = jest.fn(() => createdAt);
        });

        describe('when withCreatedAt is called', () => {
          beforeEach(() => {
            faker.withCreatedAt(mockFactory);
          });

          describe('when build is called', () => {
            beforeEach(() => {
              faker.build();
            });

            test('then should call the factory', () => {
              expect(mockFactory).toHaveBeenCalledTimes(1);
            });
          });
        });
      });

      describe('and many categories are set to use a fixed date', () => {
        let fakerMany: CategoryFakeBuilder;

        beforeEach(() => {
          fakerMany = CategoryFakeBuilder.theCategories(2);
        });

        describe('when withCreatedAt is called', () => {
          let createdAt: Date;

          beforeEach(() => {
            createdAt = new Date();
            fakerMany.withCreatedAt(() => createdAt);
          });

          test('then should set createdAt', () => {
            expect(fakerMany.build()[0].createdAt).toBe(createdAt);
            expect(fakerMany.build()[1].createdAt).toBe(createdAt);
          });

          describe('and withCreatedAt is called with a factory that receives index', () => {
            beforeEach(() => {
              fakerMany.withCreatedAt((index) => new Date(createdAt.getTime() + index + 2));
            });

            test('then should set createdAt', () => {
              const categories = fakerMany.build();
              expect(categories[0].createdAt.getTime()).toBe(createdAt.getTime() + 2);
              expect(categories[1].createdAt.getTime()).toBe(createdAt.getTime() + 3);
            });
          });
        });
      });
    });
  });

  describe('build', () => {
    describe('given a fake category', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.aCategory();
      });

      describe('when build is called', () => {
        let category: any;

        beforeEach(() => {
          category = faker.build();
        });

        test('then should return a category', () => {
          expect(category).toHaveProperty('categoryId');
          expect(category).toHaveProperty('name');
          expect(category).toHaveProperty('description');
          expect(category).toHaveProperty('isActive');
          expect(category).toHaveProperty('createdAt');

          expect(category.categoryId).toBeInstanceOf(Uuid);
          expect(typeof category.name === 'string').toBeTruthy();
          expect(typeof category.description === 'string').toBeTruthy();
          expect(category.isActive).toBe(true);
          expect(category.createdAt).toBeInstanceOf(Date);
        });
      });

      describe('given some values', () => {
        let category: any;

        beforeEach(() => {
          category = faker
            .withName('name test')
            .withDescription('description test')
            .deactivate()
            .withCreatedAt(new Date())
            .build();
        });

        test('then should return a category with the values', () => {
          expect(category.name).toBe('name test');
          expect(category.description).toBe('description test');
          expect(category.isActive).toBe(false);
        });
      });
    });

    describe('given many fake categories', () => {
      let faker: CategoryFakeBuilder;

      beforeEach(() => {
        faker = CategoryFakeBuilder.theCategories(2);
      });

      describe('when build is called', () => {
        let categories: any[];

        beforeEach(() => {
          categories = faker.build();
        });

        test('then should return a list of categories', () => {
          expect(categories.length).toBe(2);
          categories.forEach((category) => {
            expect(category).toHaveProperty('categoryId');
            expect(category).toHaveProperty('name');
            expect(category).toHaveProperty('description');
            expect(category).toHaveProperty('isActive');
            expect(category).toHaveProperty('createdAt');

            expect(category.categoryId).toBeInstanceOf(Uuid);
            expect(typeof category.name === 'string').toBeTruthy();
            expect(typeof category.description === 'string').toBeTruthy();
            expect(category.isActive).toBe(true);
            expect(category.createdAt).toBeInstanceOf(Date);
          });
        });
      });

      describe('given some values', () => {
        let categories: any[];

        beforeEach(() => {
          categories = faker
            .withName('name test')
            .withDescription('description test')
            .deactivate()
            .withCreatedAt(new Date())
            .build();
        });

        test('then should return a list of categories with the values', () => {
          categories.forEach((category) => {
            expect(category.name).toBe('name test');
            expect(category.description).toBe('description test');
            expect(category.isActive).toBe(false);
          });
        });
      });
    });
  });
});
