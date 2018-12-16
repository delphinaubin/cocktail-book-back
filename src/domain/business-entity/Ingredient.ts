import Color from '../value-object/Color';
import Name from '../value-object/Name';
import Unit from '../value-object/Unit';
import Id from '../value-object/Id';

export default class Ingredient {
  public id?: Id;
  public name: Name;
  public color: Color;
  public unit: Unit;
}
