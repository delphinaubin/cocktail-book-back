import CocktailBuilder from '../../business-entity/builder/CocktailBuilder';
import Name from '../../value-object/Name';
import CocktailPersistor from './CocktailPersistor';

describe('CocktailPersistor service', () => {
  describe('saveCocktail method', () => {
    test('should call the cocktail repository to save the given cocktail', () => {
      const cocktailRepository: any = {
        saveCocktail: jest.fn(),
      };
      const cocktailPersistor = new CocktailPersistor(cocktailRepository);
      const cocktailToSave = CocktailBuilder
        .aCocktail()
        .withName(new Name('Mojito'))
        .build();
      cocktailPersistor.saveCocktail(cocktailToSave);
      expect(cocktailRepository.saveCocktail).toHaveBeenCalledWith(cocktailToSave);
    });
  });
});
