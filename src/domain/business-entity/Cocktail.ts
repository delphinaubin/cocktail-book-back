import Name from '../value-object/Name';
import Component from './Component';
import Id from '../value-object/Id';

export default class Cocktail {
  public id: Id;
  public name: Name;
  public components: Component[] = [];
}
