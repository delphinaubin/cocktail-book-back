import Ingredient from '../domain/business-entity/Ingredient';
import IngredientRepository from '../domain/repository/IngredientRepository';
import Name from '../domain/value-object/Name';

export default class InMemoryIngredientRepository implements IngredientRepository {

  private ingredients: Ingredient[] = [];

  public saveIngredient(ingredient: Ingredient): Promise<void> {
    this.ingredients.push(ingredient);
    return Promise.resolve();
  }

  public getAllIngredients(): Promise<Ingredient[]> {
    return Promise.resolve(this.ingredients);
  }

  public getByName(name: Name): Promise<Ingredient> {
    return Promise.resolve(
        this.ingredients.find((i) => i.name.get() === name.get()),
    );
  }
}
