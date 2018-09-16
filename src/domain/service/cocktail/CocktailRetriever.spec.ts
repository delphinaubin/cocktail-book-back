import CocktailBuilder from '../../business-entity/builder/CocktailBuilder';
import Name from '../../value-object/Name';
import CocktailRetriever from './CocktailRetriever';
import Id from '../../value-object/Id';
describe('CocktailRetriever Service', () => {
describe('getAllCocktails method', () => {
    test('should call the cocktail repository to retrieve all cocktails', async () => {
      const cocktailsFromTheRepository = [
        CocktailBuilder
          .aCocktail()
          .withId(new Id('1'))
          .withName(new Name('Mojito'))
          .build(),
          CocktailBuilder
          .aCocktail()
          .withId(new Id('2'))
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
