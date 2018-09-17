import Ingredient from '../domain/business-entity/Ingredient';
import IngredientRepository from '../domain/repository/IngredientRepository';
import Name from '../domain/value-object/Name';
import * as uuid from 'uuid/v1';
import Id from '../domain/value-object/Id';

export default class InMemoryIngredientRepository implements IngredientRepository {

  private ingredients: Ingredient[] = [];

  public saveIngredient(ingredient: Ingredient): Promise<void> {
    ingredient.id = new Id(uuid());
    this.ingredients.push(ingredient);
    return Promise.resolve();
  }

  public getAllIngredients(): Promise<Ingredient[]> {
    return Promise.resolve(this.ingredients);
  }

  public getByName(name: Name): Promise<Ingredient> {
    return Promise.resolve(
        this.ingredients.find(i => i.name.get() === name.get()),
    );
  }
}
