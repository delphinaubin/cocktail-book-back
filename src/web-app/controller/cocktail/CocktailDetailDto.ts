import { CocktailDto } from './CocktailDto';

export default interface CocktailDetailDto extends CocktailDto {
  components: ComponentDto[];
}

interface ComponentDto {
  ingredient: CocktailIngredientDto;
  quantity: number;
}

interface CocktailIngredientDto {
  id: string;
  name: string;
  unit: string;
}
