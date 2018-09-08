import Cocktail from '../../business-entity/Cocktail';
import CocktailRepository from '../../repository/CocktailRepository';
export default class CocktailRetriever {
  constructor(private cocktailRepository: CocktailRepository) { }

  public getAllCocktails(): Promise<Cocktail[]> {
    return this.cocktailRepository.getAllCocktails();
  }
}
