import Cocktail from '../business-entity/Cocktail';
import Id from '../value-object/Id';

export default interface CocktailRepository {
  getAllCocktails(): Promise<Cocktail[]>;
  getCocktailById(cocktailId: Id): Promise<Cocktail|null>;
  saveCocktail(cocktail: Cocktail): Promise<void>;
}
