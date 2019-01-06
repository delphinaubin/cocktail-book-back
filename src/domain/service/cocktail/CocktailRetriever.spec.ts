import CocktailBuilder from '../../business-entity/builder/CocktailBuilder';
import Name from '../../value-object/Name';
import CocktailRetriever from './CocktailRetriever';
import Id from '../../value-object/Id';
import CocktailNotFoundError from '../../error/CocktailNotFoundError';
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

  describe('getCocktailById method', () => {
    test('should call the cocktail repository to retrieve a cocktail by given id', async () => {

      const GIVEN_ID = new Id('GIVEN ID');
      const cocktailFromTheRepository = CocktailBuilder
        .aCocktail()
        .withId(GIVEN_ID)
        .build();
      const cocktailRepository: any = {
        getCocktailById: jest.fn().mockResolvedValue(cocktailFromTheRepository),
      };

      const cocktailRetriever = new CocktailRetriever(cocktailRepository);
      const retrievedCocktail = await cocktailRetriever.getCocktailById(GIVEN_ID);
      expect(cocktailRepository.getCocktailById).toBeCalledWith(GIVEN_ID);
      expect(retrievedCocktail).toBe(cocktailFromTheRepository);
    });
    test('should throw a CocktailNotFoundError if no cocktail with the given id exist',
         async () => {
           const GIVEN_ID = new Id('GIVEN ID');
           const cocktailRepository: any = {
             getCocktailById: jest.fn().mockResolvedValue(null),
           };

           const cocktailRetriever = new CocktailRetriever(cocktailRepository);
           await expect(cocktailRetriever.getCocktailById(GIVEN_ID))
              .rejects.toThrow(new CocktailNotFoundError());
         });
  });
});
