import { Body, Get, Post, Route, Query, Path } from 'tsoa';
import DependencyFactory from '../../DependencyFactory';
import { CocktailDto } from './CocktailDto';
import { fromCocktailDto, toCocktailDtoList, toCocktailDto } from './CocktailDtoMapper';
import Id from '../../../domain/value-object/Id';
import CocktailNotFoundError from '../../../domain/error/CocktailNotFoundError';
import CocktailNotFoundApiError from '../../error/CocktailNotFoundApiError';

@Route('cocktails')
export class CocktailController {

  @Get('/{id}')
  public async getCocktailById(@Path() id: string): Promise<CocktailDto> {
    try {
      return toCocktailDto(
        await DependencyFactory
          .getCocktailRetriever()
          .getCocktailById(new Id(id)),
      );
    } catch (error) {
      if (error instanceof CocktailNotFoundError) {
        throw new CocktailNotFoundApiError();
      }
    }
  }

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
