import CocktailRepository from '../domain/repository/CocktailRepository';
import IngredientRepository from '../domain/repository/IngredientRepository';
import CocktailPersistor from '../domain/service/cocktail/CocktailPersistor';
import CocktailRetriever from '../domain/service/cocktail/CocktailRetriever';
import IngredientPersistor from '../domain/service/ingredient/IngredientPersistor';
import IngredientRetriever from '../domain/service/ingredient/IngredientRetriever';
import InMemoryCocktailRepository from '../in-memory-repository/InMemoryCocktailRepository';
import InMemoryIngredientRepository from '../in-memory-repository/InMemoryIngredientRepository';
export default class DependencyFactory {

  public static getCocktailRepository(): CocktailRepository {
    return singleton(InMemoryCocktailRepository);
  }
  public static getIngredientRepository(): IngredientRepository {
    return singleton(InMemoryIngredientRepository);
  }
  public static getCocktailRetriever(): CocktailRetriever {
    return new CocktailRetriever(
      DependencyFactory.getCocktailRepository(),
    );
  }
  public static getIngredientRetriever(): IngredientRetriever {
    return new IngredientRetriever(
      DependencyFactory.getIngredientRepository(),
    );
  }
  public static getCocktailPersistor(): CocktailPersistor {
    return new CocktailPersistor(
      DependencyFactory.getCocktailRepository(),
    );
  }
  public static getIngredientPersistor(): IngredientPersistor {
    return new IngredientPersistor(
      DependencyFactory.getIngredientRepository(),
    );
  }
}

const instances = {};
function singleton(classToSingleton: any, ...params): any {
  if (!instances[classToSingleton.name]) {
    instances[classToSingleton.name] = new classToSingleton(...params);
  }
  return instances[classToSingleton.name];
}
