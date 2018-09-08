import { Body, Get, Post, Route, SuccessResponse } from 'tsoa';
import DependencyFactory from '../../DependencyFactory';
import { CocktailDto } from './CocktailDto';
import { fromCocktailDto, toCocktailDtoList } from './CocktailDtoMapper';

@Route('cocktails')
export class CocktailController {

  @Get()
  public async getCocktail(): Promise<CocktailDto[]> {
    return toCocktailDtoList(
      await DependencyFactory
        .getCocktailRetriever()
        .getAllCocktails(),
    );
  }

  @Post()
  public async addCocktail(@Body()cocktail: CocktailDto): Promise<void> {
    await DependencyFactory
      .getCocktailPersistor()
      .saveCocktail(fromCocktailDto(cocktail));
  }
}
