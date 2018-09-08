import Quantity from '../value-object/Quantity';
import Ingredient from './Ingredient';

export default class Component {
  public ingredient: Ingredient;
  public quantity: Quantity;
}
