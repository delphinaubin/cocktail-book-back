import CocktailBuilder from '../../../domain/business-entity/builder/CocktailBuilder';
import Cocktail from '../../../domain/business-entity/Cocktail';
import Name from '../../../domain/value-object/Name';
import { CocktailDto } from './CocktailDto';
export const toCocktailDtoList = (cocktails: Cocktail[]): CocktailDto[] => {
  return cocktails.map(toCocktailDto);
};

export const toCocktailDto = (cocktail: Cocktail): CocktailDto  => (
  {
    name: cocktail.name.get(),
  }
);
export const fromCocktailDto = (cocktail: CocktailDto) => CocktailBuilder
  .aCocktail()
  .withName(new Name(cocktail.name))
  .build();
