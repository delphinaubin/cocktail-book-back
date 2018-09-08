import Cocktail from '../domain/business-entity/Cocktail';
import CocktailRepository from '../domain/repository/CocktailRepository';
export default class InMemoryCocktailRepository implements CocktailRepository {

  private cocktails: Cocktail[] = [];

  public getAllCocktails(): Promise<Cocktail[]> {
    return Promise.resolve(this.cocktails);
  }
  public saveCocktail(cocktail: Cocktail): Promise<void> {
    this.cocktails.push(cocktail);
    return Promise.resolve();
  }
}
