import Ingredient from '../business-entity/Ingredient';
import Name from '../value-object/Name';

export default interface IngredientRepository {
  saveIngredient(ingredient: Ingredient): Promise<void>;
  getAllIngredients(): Promise<Ingredient[]>;
  getByName(ingredientName: Name): Promise<Ingredient|null>;
}
