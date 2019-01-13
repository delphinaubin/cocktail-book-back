import CocktailBuilder from '../../../domain/business-entity/builder/CocktailBuilder';
import Cocktail from '../../../domain/business-entity/Cocktail';
import Name from '../../../domain/value-object/Name';
import { CocktailDto } from './CocktailDto';
import CocktailToCreateDto from './CocktailToCreateDto';
import ComponentBuilder from '../../../domain/business-entity/builder/ComponentBuilder';
import Quantity from '../../../domain/value-object/Quantity';
import IngredientBuilder from '../../../domain/business-entity/builder/IngredientBuilder';
import Id from '../../../domain/value-object/Id';
export const toCocktailDtoList = (cocktails: Cocktail[]): CocktailDto[] => {
  return cocktails.map(toCocktailDto);
};

export const toCocktailDto = (cocktail: Cocktail): CocktailDto  => (
{
  id: cocktail.id.get(),
  name: cocktail.name.get(),
}
);
export const fromCocktailToCreateDto = (cocktail: CocktailToCreateDto) => CocktailBuilder
  .aCocktail()
  .withName(new Name(cocktail.name))
  .withComponents(
    (cocktail.components || []).map(component => ComponentBuilder
      .aComponent()
      .withQuantity(new Quantity(component.quantity))
      .withIngredient(
        IngredientBuilder
          .anIngredient()
          .withId(new Id(component.ingredient.id))
          .build(),
      )
      .build(),
    ),
  )
  .build();
