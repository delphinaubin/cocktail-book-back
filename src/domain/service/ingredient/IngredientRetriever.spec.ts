import IngredientBuilder from '../../business-entity/builder/IngredientBuilder';
import Name from '../../value-object/Name';
import IngredientRetriever from './IngredientRetriever';

describe('IngredientRetriever', () => {
  describe('getAllIngredients method', () => {
    test('should call the IngredientRepository to retrieve all ingredients', async () => {
      const INGREDIENTS_FROM_REPOSITORY = [
        IngredientBuilder
          .anIngredient()
          .withName(new Name('lime'))
          .build(),
        IngredientBuilder
          .anIngredient()
          .withName(new Name('lemon'))
          .build(),
      ];
      const ingredientRepository: any = {
        getAllIngredients: jest.fn().mockResolvedValue(INGREDIENTS_FROM_REPOSITORY),
      };
      const ingredientRetriever = new IngredientRetriever(ingredientRepository);
      const ingredients = await ingredientRetriever.getAllIngredients();
      expect(ingredientRepository.getAllIngredients).toHaveBeenCalled();
      expect(ingredients).toBe(INGREDIENTS_FROM_REPOSITORY);
    });
  });
});
