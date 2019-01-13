import { Body, Get, Post, Route, Query, Path } from 'tsoa';
import DependencyFactory from '../../DependencyFactory';
import { CocktailDto } from './CocktailDto';
import { fromCocktailToCreateDto, toCocktailDtoList } from './CocktailDtoMapper';
import Id from '../../../domain/value-object/Id';
import CocktailNotFoundError from '../../../domain/error/CocktailNotFoundError';
import CocktailNotFoundApiError from '../../error/CocktailNotFoundApiError';
import CocktailDetailDto from './CocktailDetailDto';
import { toCocktailDetailDto } from './CocktailDetailDtoMapper';
import CocktailToCreateDto from './CocktailToCreateDto';
import IngredientNotFoundError from '../../../domain/error/IngredientNotFoundError';
import InvalidArgumentApiError from '../../error/InvalidArgumentApiError';

@Route('cocktails')
export class CocktailController {

  @Get('/{id}')
  public async getCocktailById(@Path() id: string): Promise<CocktailDetailDto> {
    try {
      return toCocktailDetailDto(
        await DependencyFactory
          .getCocktailRetriever()
          .getCocktailById(new Id(id)),
      );
    } catch (error) {
      if (error instanceof CocktailNotFoundError) {
        throw new CocktailNotFoundApiError();
      } else {
        throw error;
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
  public async addCocktail(@Body()cocktail: CocktailToCreateDto): Promise<void> {
    try {
      await DependencyFactory
        .getCocktailPersistor()
        .saveCocktail(fromCocktailToCreateDto(cocktail));
    } catch (error) {
      if (error instanceof IngredientNotFoundError) {
        throw new InvalidArgumentApiError('One of given cocktail\'s ingredients doesn\'t exist');
      }
      console.log(error);
    }
  }
}
