import Name from '../../value-object/Name';
import Cocktail from '../Cocktail';
import Component from '../Component';
import Id from '../../value-object/Id';

export default class CocktailBuilder {
  public static aCocktail(): CocktailBuilder {
    return new CocktailBuilder();
  }
  private cocktail: Cocktail;
  private constructor() {
    this.cocktail = new Cocktail();
  }
  public withId(id: Id): this {
    this.cocktail.id = id;
    return this;
  }
  public withName(name: Name): this {
    this.cocktail.name = name;
    return this;
  }
  public withComponents(components: Component[]): this {
    this.cocktail.components = components;
    return this;
  }
  public build(): Cocktail {
    return this.cocktail;
  }

}
