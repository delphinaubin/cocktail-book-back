import Cocktail from '../../../domain/business-entity/Cocktail';
import CocktailDetailDto from './CocktailDetailDto';
import { toCocktailDto } from './CocktailDtoMapper';

export const toCocktailDetailDto = (cocktail: Cocktail): CocktailDetailDto => {
  console.log('cocktail', cocktail);
  const cocktailDetailDto = {
    ...toCocktailDto(cocktail),
    components: (cocktail.components || []).map(({ ingredient, quantity }) => ({
      ingredient: {
        id: ingredient.id.get(),
        name: ingredient.name.get(),
        unit: ingredient.unit.get(),
      },
      quantity: quantity.get(),
    })),
  };
  return cocktailDetailDto;

};
