import IngredientBuilder from '../../business-entity/builder/IngredientBuilder';
import DuplicateDataError from '../../error/DuplicateDataError';
import Name from '../../value-object/Name';
import IngredientPersistor from './IngredientPersistor';
let ingredientRepository: any;
let ingredientPersistor: IngredientPersistor;
describe('IngredientPersistor service', () => {
  beforeEach(() => {
    ingredientRepository = {
      getByName: jest.fn(),
      saveIngredient: jest.fn(),
    };
    ingredientPersistor = new IngredientPersistor(ingredientRepository);
  });
  describe('saveIngredient method', () => {
    test('should call the ingredient repository to save the given ingredient', async () => {

      const AN_INGREDIENT = IngredientBuilder
        .anIngredient()
        .withName(new Name('Lemon'))
        .build();
      await ingredientPersistor.saveIngredient(AN_INGREDIENT);
      expect(ingredientRepository.saveIngredient).toBeCalledWith(AN_INGREDIENT);
    });

    test('should prevent name duplication', async (done) => {
      const DUPLICATE_INGREDIENT = IngredientBuilder
        .anIngredient()
        .withName(new Name('A NAME'))
        .build();
      ingredientRepository.getByName.mockResolvedValue(DUPLICATE_INGREDIENT);

      try {
        await ingredientPersistor.saveIngredient(DUPLICATE_INGREDIENT);
      } catch (error) {
        expect(error).toBeInstanceOf(DuplicateDataError);
        expect(error.message).toEqual('Duplicate ingredient name (A NAME)');
        expect(ingredientRepository.getByName)
          .toHaveBeenCalledWith(new Name('A NAME'));
        done();
      }

    });
  });
});
