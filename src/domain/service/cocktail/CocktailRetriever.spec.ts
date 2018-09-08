import CocktailBuilder from '../../business-entity/builder/CocktailBuilder';
import Name from '../../value-object/Name';
import CocktailRetriever from './CocktailRetriever';
describe('CocktailRetriever Service', () => {
describe('getAllCocktails method', () => {
    test('should call the cocktail repository to retrieve all cocktails', async () => {
      const cocktailsFromTheRepository = [
        CocktailBuilder
          .aCocktail()
          .withName(new Name('Mojito'))
          .build(),
        CocktailBuilder
          .aCocktail()
          .withName(new Name('Maï Taï'))
          .build(),
      ];
      const cocktailRepository: any = {
        getAllCocktails: jest.fn().mockResolvedValue(cocktailsFromTheRepository),
      };
      const cocktailRetriever = new CocktailRetriever(cocktailRepository);
      const cocktails = await cocktailRetriever.getAllCocktails();
      expect(cocktailRepository.getAllCocktails).toHaveBeenCalled();
      expect(cocktails).toBe(cocktailsFromTheRepository);
    });
  });
});
