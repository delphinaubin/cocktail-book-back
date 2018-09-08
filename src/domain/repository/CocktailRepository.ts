import Cocktail from '../business-entity/Cocktail';

export default interface CocktailRepository {
  getAllCocktails(): Promise<Cocktail[]>;
  saveCocktail(cocktail: Cocktail): Promise<void>;
}
