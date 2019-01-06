import Cocktail from '../../business-entity/Cocktail';
import CocktailRepository from '../../repository/CocktailRepository';
import Id from '../../value-object/Id';
import CocktailNotFoundError from '../../error/CocktailNotFoundError';
export default class CocktailRetriever {
  constructor(private cocktailRepository: CocktailRepository) { }

  public getAllCocktails(): Promise<Cocktail[]> {
    return this.cocktailRepository.getAllCocktails();
  }

  public async getCocktailById(cocktailId: Id): Promise<Cocktail> {
    const result =  await this.cocktailRepository.getCocktailById(cocktailId);
    if (result === null) {
      throw new CocktailNotFoundError();
    }
    return result;
  }
}
