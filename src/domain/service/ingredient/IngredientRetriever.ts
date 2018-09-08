
import Ingredient from '../../business-entity/Ingredient';
import IngredientRepository from '../../repository/IngredientRepository';
export default class IngredientRetriever {
  constructor(private ingredientRepository: IngredientRepository) { }
  public getAllIngredients(): Promise<Ingredient[]> {
    return this.ingredientRepository.getAllIngredients();
  }

}
