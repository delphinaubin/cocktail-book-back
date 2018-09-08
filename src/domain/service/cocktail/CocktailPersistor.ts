
import Cocktail from '../../business-entity/Cocktail';
import CocktailRepository from '../../repository/CocktailRepository';
export default class CocktailPersistor {

  constructor(
    private cocktailRepository: CocktailRepository,
  ) {}

  public saveCocktail(cocktail: Cocktail): Promise<void> {
    return this.cocktailRepository.saveCocktail(cocktail);
  }
}
