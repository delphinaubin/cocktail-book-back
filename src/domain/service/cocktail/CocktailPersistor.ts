
import Cocktail from '../../business-entity/Cocktail';
import CocktailRepository from '../../repository/CocktailRepository';
import IngredientRepository from '../../repository/IngredientRepository';
import IngredientNotFoundError from '../../error/IngredientNotFoundError';
export default class CocktailPersistor {

  constructor(
    private cocktailRepository: CocktailRepository,
    private ingredientRepository: IngredientRepository,
  ) {}

  public async saveCocktail(cocktail: Cocktail): Promise<void> {

    const components = await Promise.all((cocktail.components || []).map(
      async (component) => {
        const ingredientInDatabase = await this
          .ingredientRepository
          .getById(component.ingredient.id);
        if (!ingredientInDatabase) {
          throw new IngredientNotFoundError();
        }
        return {
          ...component,
          ingredient: ingredientInDatabase,
        };
      },
    ));

    return await this.cocktailRepository.saveCocktail({
      ...cocktail,
      components,
    });
  }
}
