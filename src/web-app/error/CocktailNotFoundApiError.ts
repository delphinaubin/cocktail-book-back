import NotFoundApiError from './NotFoundApiError';
export default class CocktailNotFoundApiError extends NotFoundApiError {
  constructor() {
    super('COCKTAIL NOT FOUND');
  }
}
