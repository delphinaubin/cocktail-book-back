export default interface CocktailToCreateDto {
  name: string;
  components: CocktailToCreateComponentDto[];
}

export interface CocktailToCreateComponentDto {
  quantity: number;
  ingredient: CocktailToCreateIngredientDto;
}

export interface CocktailToCreateIngredientDto {
  id: string;
}
