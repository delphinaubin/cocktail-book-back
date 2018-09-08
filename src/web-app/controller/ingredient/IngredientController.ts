import { Body, Get, Post, Route } from 'tsoa';
import DuplicateDataError from '../../../domain/error/DuplicateDataError';
import DependencyFactory from '../../DependencyFactory';
import { IngredientDto } from './IngredientDto';
import { fromIngredientDto, toIngredientDtoList } from './IngredientDtoMapper';

@Route('ingredients')
export class IngredientController {

  @Get()
  public async getAllIngredients(): Promise<IngredientDto[]> {
    return toIngredientDtoList(
      await DependencyFactory
        .getIngredientRetriever()
        .getAllIngredients(),
    );
  }

  @Post()
  public async addIngredient(@Body() ingredient: IngredientDto): Promise<void> {
    try {
      await DependencyFactory
        .getIngredientPersistor()
        .saveIngredient(fromIngredientDto(ingredient));
    } catch (error) {
      if (error instanceof DuplicateDataError) {
        // throw new ApiExce
      }
    }
  }
}
