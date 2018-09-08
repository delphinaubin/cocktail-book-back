import Quantity from '../../value-object/Quantity';
import Component from '../Component';
import Ingredient from '../Ingredient';

export default class ComponentBuilder {

  public static aComponent(): ComponentBuilder {
    return new ComponentBuilder();
  }
  private component: Component;
  private constructor() {
    this.component = new Component();
  }
  public withIngredient(ingredient: Ingredient): this {
    this.component.ingredient = ingredient;
    return this;
  }
  public withQuantity(quantity: Quantity): this {
    this.component.quantity = quantity;
    return this;
  }
  public build(): Component {
    return this.component;
  }
}
