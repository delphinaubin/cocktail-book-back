import Ingredient from '../business-entity/Ingredient';
import Name from '../value-object/Name';
import Id from '../value-object/Id';

export default interface IngredientRepository {
  saveIngredient(ingredient: Ingredient): Promise<void>;
  getAllIngredients(): Promise<Ingredient[]>;
  getByName(ingredientName: Name): Promise<Ingredient|null>;
  getById(ingredientId: Id): Promise<Ingredient|null>;
}
