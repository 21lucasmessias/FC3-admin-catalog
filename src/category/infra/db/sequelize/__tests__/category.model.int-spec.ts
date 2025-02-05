import { DataType, Sequelize } from 'sequelize-typescript';
import { Category } from 'src/category/domain/category.entity';
import { CategoryModel } from '../category.model';

describe('Category Model Integration Test', () => {
  describe('given a instance of sequelize', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        models: [CategoryModel],
      });
    });

    beforeEach(async () => {
      await sequelize.sync({ force: true });
    });

    describe('given a Category Entity', () => {
      let category: Category;

      beforeEach(() => {
        category = Category.fake().aCategory().build();
      });

      describe('when CategoryModel.create is called', () => {
        beforeEach(async () => {
          await CategoryModel.create({
            categoryId: category.categoryId.id,
            name: category.name,
            description: category.description,
            isActive: category.isActive,
            createdAt: category.createdAt,
          });
        });

        test('then it should persist the category', async () => {
          await expect(CategoryModel.findByPk(category.categoryId.id)).resolves.toMatchObject({
            categoryId: category.categoryId.id,
            name: category.name,
            description: category.description,
            isActive: category.isActive,
            createdAt: category.createdAt,
          });
        });
      });
    });

    describe('given a Category Model', () => {
      describe('when mapping attributes', () => {
        test('then should have the same attributes', () => {
          const attributesMap = CategoryModel.getAttributes();
          const attributes = Object.keys(attributesMap);

          expect(attributes).toEqual(['categoryId', 'name', 'description', 'isActive', 'createdAt']);

          const categoryIdAttr = attributesMap.categoryId;
          expect(categoryIdAttr).toMatchObject({
            field: 'categoryId',
            fieldName: 'categoryId',
            primaryKey: true,
            type: DataType.UUID(),
          });

          const nameAttr = attributesMap.name;
          expect(nameAttr).toMatchObject({
            field: 'name',
            fieldName: 'name',
            allowNull: false,
            type: DataType.STRING(255),
          });

          const descriptionAttr = attributesMap.description;
          expect(descriptionAttr).toMatchObject({
            field: 'description',
            fieldName: 'description',
            allowNull: true,
            type: DataType.TEXT(),
          });

          const isActiveAttr = attributesMap.isActive;
          expect(isActiveAttr).toMatchObject({
            field: 'isActive',
            fieldName: 'isActive',
            allowNull: false,
            type: DataType.BOOLEAN(),
          });

          const createdAtAttr = attributesMap.createdAt;
          expect(createdAtAttr).toMatchObject({
            field: 'createdAt',
            fieldName: 'createdAt',
            allowNull: false,
            type: DataType.DATE(3),
          });
        });
      });
    });
  });
});
