import Ingredient from '../../business-entity/Ingredient';
import DuplicateDataError from '../../error/DuplicateDataError';
import IngredientRepository from '../../repository/IngredientRepository';

export default class IngredientPersistor {
  constructor(private ingredientRepository: IngredientRepository) {}
  public async saveIngredient(ingredient: Ingredient): Promise<void> {
    const existingIngredient = await this.ingredientRepository.getByName(ingredient.name);
    if (existingIngredient) {
      throw new DuplicateDataError(`Duplicate ingredient name (${existingIngredient.name.get()})`);
    }
    return this.ingredientRepository.saveIngredient(ingredient);
  }
}
