import IngredientBuilder from '../../../domain/business-entity/builder/IngredientBuilder';
import Ingredient from '../../../domain/business-entity/Ingredient';
import Color from '../../../domain/value-object/Color';
import Name from '../../../domain/value-object/Name';
import Unit from '../../../domain/value-object/Unit';
import { IngredientDto } from './IngredientDto';

export const fromIngredientDto = (ingredientDto: IngredientDto): Ingredient => IngredientBuilder
  .anIngredient()
  .withName(new Name(ingredientDto.name))
  .withUnit(new Unit(ingredientDto.unit))
  .withColor(new Color(ingredientDto.color))
  .build();

export const toIngredientDto = (ingredient: Ingredient): IngredientDto => (
  {
    color: ingredient.color.get(),
    name: ingredient.name.get(),
    unit: ingredient.unit.get(),
  }
);

export const toIngredientDtoList = (ingredients: Ingredient[]): IngredientDto[] => ingredients
  .map(toIngredientDto);
