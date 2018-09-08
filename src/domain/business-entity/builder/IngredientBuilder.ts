import Color from '../../value-object/Color';
import Name from '../../value-object/Name';
import Unit from '../../value-object/Unit';
import Ingredient from '../Ingredient';

export default class IngredientBuilder {

  public static anIngredient(): IngredientBuilder {
    return new IngredientBuilder();
  }
  private ingredient: Ingredient;
  private constructor() {
    this.ingredient = new Ingredient();
  }

  public withName(name: Name): this {
    this.ingredient.name = name;
    return this;
  }

  public withColor(color: Color): this {
    this.ingredient.color = color;
    return this;
  }

  public withUnit(unit: Unit): this {
    this.ingredient.unit = unit;
    return this;
  }

  public build(): Ingredient {
    return this.ingredient;
  }
}
