import CocktailBuilder from '../../business-entity/builder/CocktailBuilder';
import Name from '../../value-object/Name';
import CocktailPersistor from './CocktailPersistor';
import ComponentBuilder from '../../business-entity/builder/ComponentBuilder';
import IngredientBuilder from '../../business-entity/builder/IngredientBuilder';
import Id from '../../value-object/Id';

import CocktailRepository from '../../repository/CocktailRepository';
import IngredientRepository from '../../repository/IngredientRepository';
import { Mock } from '../../../types/Mock';
import Quantity from '../../value-object/Quantity';
import IngredientNotFoundError from '../../error/IngredientNotFoundError';
let cocktailRepository: Mock<CocktailRepository>;
let ingredientRepository: Mock<IngredientRepository>;
let cocktailPersistor: CocktailPersistor;

describe('CocktailPersistor service', () => {
  beforeEach(() => {
    cocktailRepository = {
      saveCocktail: jest.fn(),
    } as any;
    ingredientRepository = {
      getById: jest.fn(),
    } as any;
    cocktailPersistor = new CocktailPersistor(
      cocktailRepository as any,
      ingredientRepository as any,
    );
  });
  describe('saveCocktail method', () => {
    it('should call the cocktail repository to save the given cocktail', async () => {

      const cocktailToSave = CocktailBuilder
        .aCocktail()
        .withName(new Name('Mojito'))
        .build();
      await cocktailPersistor.saveCocktail(cocktailToSave);
      expect(cocktailRepository.saveCocktail).toHaveBeenCalledWith(cocktailToSave);
    });
    it('should call the ingredient repository to retrieve ingredients by id', async () => {
      const INGREDIENT_ID = new Id('INGREDIENT_ID');
      const INGREDIENT_QUANTITY = new Quantity(2);
      const existingIngredient = IngredientBuilder
        .anIngredient()
        .withId(INGREDIENT_ID)
        .withName(new Name('AN INGREDIENT'))
        .build();
      ingredientRepository.getById.mockResolvedValue(existingIngredient);
      const cocktailToSave = CocktailBuilder
        .aCocktail()
        .withComponents([
          ComponentBuilder
            .aComponent()
            .withQuantity(INGREDIENT_QUANTITY)
            .withIngredient(
              IngredientBuilder
                .anIngredient()
                .withId(INGREDIENT_ID)
                .build(),
            )
            .build(),
        ])
        .build();
      await cocktailPersistor.saveCocktail(cocktailToSave);
      expect(ingredientRepository.getById).toHaveBeenCalledWith(INGREDIENT_ID);
      expect(cocktailRepository.saveCocktail).toHaveBeenCalledWith(
        CocktailBuilder
        .aCocktail()
        .withComponents([
          ComponentBuilder
            .aComponent()
            .withQuantity(INGREDIENT_QUANTITY)
            .withIngredient(existingIngredient)
            .build(),
        ])
        .build(),
      );

    });
    it('should throw an error if the given cocktail contains an unexisting ingredient',
       async () => {
         const UNEXISTING_ID = new Id('INGREDIENT_ID');
         const cocktailToSave = CocktailBuilder
        .aCocktail()
        .withComponents([
          ComponentBuilder
            .aComponent()
            .withIngredient(IngredientBuilder
                .anIngredient()
                .withId(UNEXISTING_ID)
                .build(),
              )
              .build(),
        ])
        .build();

         await expect(cocktailPersistor.saveCocktail(cocktailToSave))
        .rejects
        .toThrow(new IngredientNotFoundError());

       });
  });
});
