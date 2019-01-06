import Cocktail from '../domain/business-entity/Cocktail';
import CocktailRepository from '../domain/repository/CocktailRepository';
import * as uuid from 'uuid/v1';
import Id from '../domain/value-object/Id';
export default class InMemoryCocktailRepository implements CocktailRepository {

  private cocktails: Cocktail[] = [];

  public getAllCocktails(): Promise<Cocktail[]> {
    return Promise.resolve(this.cocktails);
  }

  public getCocktailById(cocktailId: Id): Promise<Cocktail|null> {
    return Promise.resolve(
      this
        .cocktails
        .find(cocktail => cocktail.id.get() === cocktailId.get()) || null,
    );
  }
  public saveCocktail(cocktail: Cocktail): Promise<void> {
    cocktail.id = new Id(uuid());
    this.cocktails.push(cocktail);
    return Promise.resolve();
  }
}
